const subscriptionModel = require('../models/subscription');

const getAvailableSubscriptions = async (req, res) => {
  try {
    const subscriptions = await subscriptionModel.getAvailableSubscriptions();
    res.json(subscriptions);
  } catch (error) {
    console.error('Error fetching available subscriptions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const getActiveSubscription = async (req, res) => {
  const { userId } = req.params;
  try {
    const subscriptions = await subscriptionModel.getActiveSubscription(userId);
    if (!subscriptions) {
      return res.status(404).json({ error: 'No active subscription found' });
    }
    const currentDate = new Date();
    const subscriptionEndDate = new Date(subscriptions.subscriptions_end);
    const hasExpired = currentDate > subscriptionEndDate;
    const timeDifference = subscriptionEndDate - currentDate;
    const remainingDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    const responseObject = {
      subscriptions_start: subscriptions.subscriptions_start,
      subscriptions_end: subscriptions.subscriptions_end,
      has_expired: hasExpired,
      remaining_days: remainingDays,
    };
    if (hasExpired) {
      responseObject.renew_now = 'Renew Now';
    }
    console.log("getActiveSubscription", responseObject )
    res.json(responseObject);
  } catch (error) {
    console.error('Error in getActiveSubscription:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const subscriptionDurations = {
  'Weekly': 7,
  'Monthly': 30,
  'Yearly': 365,
};
const updateUserSubscription = async (req, res) => {
  try {
    const { username } = req.user;
    const { subscriptionType } = req.body;
    const numberOfDays = subscriptionDurations[subscriptionType];
    if (numberOfDays === undefined) {
      return res.status(400).json({ error: 'Invalid subscription type' });
    }
    const subscriptionEndDate = new Date();
    subscriptionEndDate.setDate(subscriptionEndDate.getDate() + numberOfDays);
    const updatedSubscription = await subscriptionModel.updateUserSubscription(
      username, subscriptionType, subscriptionEndDate, numberOfDays);
    if (!updatedSubscription) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log("Subscription updated successfully")
    res.status(200).json({ message: 'Subscription updated successfully' });
  } catch (error) {
    console.error('Error updating user subscription:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  getAvailableSubscriptions,
  updateUserSubscription,
  getActiveSubscription,
};


