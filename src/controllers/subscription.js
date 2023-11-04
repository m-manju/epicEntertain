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


const updateSubscriptionPlan = (req, res) => {
  const { userId, subscriptionTypeId } = req.body;
  subscriptionModel.updateSubscriptionPlan(userId, subscriptionTypeId, (err) => {
    if (err) {
      console.error('Error updating subscription plan:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json({ message: 'Subscription plan updated successfully' });
  });
};


const getActiveSubscription = (req, res) => {
  const { userId } = req.params;
  subscriptionModel.getActiveSubscription(userId, (err, subscription) => {
    if (err) {
      console.error('Error fetching active subscription:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (!subscription) {
      return res.status(404).json({ error: 'No active subscription found' });
    }
    const currentDate = new Date();
    const subscriptionEndDate = new Date(subscription.subscription_end);
    const hasExpired = currentDate > subscriptionEndDate;
    const timeDifference = subscriptionEndDate - currentDate;
    const remainingDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    const responseObject = {
      subscription_start: subscription.subscription_start,
      subscription_end: subscription.subscription_end,
      has_expired: hasExpired,
      remaining_days: remainingDays, 
    };

    if (hasExpired) {
      responseObject.renew_now = 'Renew Now';
    }
    res.json(responseObject);
  });
};



const subscriptionDurations = {
  'Weekly': 7,
  'Monthly': 30,
  'Yearly': 365,
};

const updateUserSubscription = async (req, res) => {
  try {
    const { username } = req.user;
    const { subscriptionTypeId, subscriptionType } = req.body;

    const numberOfDays = subscriptionDurations[subscriptionType];

    if (numberOfDays === undefined) {
      return res.status(400).json({ error: 'Invalid subscription type' });
    }

    const subscriptionEndDate = new Date();
    subscriptionEndDate.setDate(subscriptionEndDate.getDate() + numberOfDays);
    const updatedSubscription = await subscriptionModel.updateUserSubscription(
      username,
      subscriptionTypeId,
      subscriptionEndDate
    );

    if (!updatedSubscription) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'Subscription updated successfully' });
  } catch (error) {
    console.error('Error updating user subscription:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAvailableSubscriptions,
  updateSubscriptionPlan,
  updateUserSubscription,
  getActiveSubscription,
};