/* eslint-disable no-useless-catch */

const db = require('../../config/db');

const getAffectedUsers = async (planId) => {
  try {
    const selectQuery = 'SELECT signup_id FROM subscriptions WHERE type_id = ?';
    const results = await db.query(selectQuery, [planId]);
    return results;
  } catch (error) {
    throw error;
  }
};

const transferUsersToNewPlan = async (userIds, newPlanId) => {
  try {
    const updateQuery = 'UPDATE subscriptions SET type_id = ? WHERE signup_id IN (?)';
    const result = await db.query(updateQuery, [newPlanId, userIds]);
    return result.affectedRows > 0;
  } catch (error) {
    throw error;
  }
};

const deletePlan = async (planId) => {
  try {
    const deleteQuery = 'DELETE FROM subscription_type WHERE id = ?';
    const result = await db.query(deleteQuery, [planId]);
    return result.affectedRows > 0;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAffectedUsers,
  transferUsersToNewPlan,
  deletePlan,
};
