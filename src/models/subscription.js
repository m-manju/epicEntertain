/* eslint-disable no-useless-catch */
const db = require('../config/db');

const getAvailableSubscriptions = async () => {
  try {
    const selectQuery = 'SELECT * FROM subscription_type';
    const results = await db.query(selectQuery);
    return results;
  } catch (error) {
    throw error;
  }
}

const subscriptionDurations = {
  'Weekly': 7,
  'Monthly': 30,
  'Yearly': 365,
};

const updateUserSubscription = async (username, subscriptionType) => {
  try {  
    const getTypeIdQuery = `SELECT id
      FROM subscription_type WHERE type = ?`;
    const subscriptionTypeIdResult = await db.query(getTypeIdQuery, [subscriptionType]);
    const subscriptionTypeId = subscriptionTypeIdResult[0].id;
    const selectQuery = ` SELECT COUNT(*) as count
      FROM subscriptions
      INNER JOIN signup ON signup.id = subscriptions.signup_id
      WHERE signup.username = ?`;
    const countResult = await db.query(selectQuery, [username]);
    const numberOfDays = subscriptionDurations[subscriptionType];
    if (countResult[0].count === 0) {
      const insertQuery = `
        INSERT INTO subscriptions (type_id, signup_id, start_date, end_date, bought)
        SELECT ?, signup.id, NOW(), DATE_ADD(NOW(), INTERVAL ? DAY), 1
        FROM signup WHERE signup.username = ?`;

      const insertResult = await db.query(insertQuery, [subscriptionTypeId, numberOfDays, username]);
      return insertResult;
    } else {
      const updateQuery = ` UPDATE subscriptions
        INNER JOIN signup ON signup.id = subscriptions.signup_id
        SET subscriptions.type_id = ?,
          subscriptions.start_date = NOW(),
          subscriptions.end_date = DATE_ADD(NOW(), INTERVAL ? DAY),
          subscriptions.bought = 1
        WHERE signup.username = ?`;

      const updateResult = await db.query(updateQuery, [subscriptionTypeId, numberOfDays, username]);
      return updateResult;
    }
  } catch (error) {
    throw error;
  }
};

const getActiveSubscription = async (userId) => {
  try {
    const selectQuery = ` SELECT start_date, end_date
      FROM subscriptions WHERE id = ? AND type_id IS NOT NULL`;
    const results = await db.query(selectQuery, [userId]);
    if (!results || results.length === 0) 
    {
      return {
        has_expired: true,
      };
    }
    const subscriptions = results[0];
    const currentDate = new Date();
    const endDate = new Date(subscriptions.end_date);
    const remainingDays = Math.max(0, Math.ceil((endDate - currentDate) / (1000 * 60 * 60 * 24)));
    const hasExpired = endDate < currentDate;
    return {
      subscriptions_start: subscriptions.start_date,
      subscriptions_end: subscriptions.end_date,
      remaining_days: remainingDays,
      has_expired: hasExpired,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAvailableSubscriptions,
  getActiveSubscription,
  updateUserSubscription,
};
