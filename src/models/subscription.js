const db = require('../config/db');

const getAvailableSubscriptions = () => {
  return new Promise((resolve, reject) => {
    const selectQuery = 'SELECT * FROM subscription_type';
    db.query(selectQuery, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};


const updateSubscriptionPlan = (userId, subscriptionTypeId, callback) => {
  const updateQuery = 'UPDATE signup SET subscription_type_id = ? WHERE id = ?';
  db.query(updateQuery, [subscriptionTypeId, userId], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null);
  });

};

const getActiveSubscription = (userId, callback) => {
  const selectQuery = `
    SELECT subscription_start, subscription_end
    FROM signup
    WHERE id = ? AND subscription_type_id IS NOT NULL
  `;
  db.query(selectQuery, [userId], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results[0]);
  });
};

const updateUserSubscription = (username, subscriptionTypeId) => {
  return new Promise((resolve, reject) => {
    const updateQuery = `
      UPDATE signup
      SET
        bought = 1,
        subscription_type_id = ?,
        subscription_start = NOW(), -- Set subscription start date
        subscription_end = DATE_ADD(NOW(), INTERVAL 30 DAY) -- Set subscription end date (e.g., 30 days from now)
      WHERE
        username = ?`;

    db.query(updateQuery, [subscriptionTypeId, username], (err, results) => {
      if (err) {
        console.error('Error updating subscription:', err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = {
  getAvailableSubscriptions,
  updateSubscriptionPlan,
  getActiveSubscription,
  updateUserSubscription,
};
