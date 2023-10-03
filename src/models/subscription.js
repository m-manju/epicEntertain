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

    const subscription = results[0];
    if (!subscription) {
      return callback(null, null);
    }

    const currentDate = new Date();
    const endDate = new Date(subscription.subscription_end);
    const remainingDays = Math.max(0, Math.ceil((endDate - currentDate) / (1000 * 60 * 60 * 24)));
    const hasExpired = endDate < currentDate;

    callback(null, {
      subscription_start: subscription.subscription_start,
      subscription_end: subscription.subscription_end,
      remaining_days: remainingDays,
      has_expired: hasExpired,
    });
  });
};

const updateUserSubscription = (username, subscriptionTypeId, subscriptionEndDate) => {
  return new Promise((resolve, reject) => {
    const updateQuery = `
      UPDATE signup
      SET
        bought = 1,
        subscription_type_id = ?,
        subscription_start = NOW(),
        subscription_end = ?
      WHERE username = ?`;

    db.query(updateQuery, [subscriptionTypeId, subscriptionEndDate, username], (err, results) => {
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
