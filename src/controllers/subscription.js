const subscriptionModel = require('../models/subscription');
const userModel = require('../models/user'); 

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


const updateUserSubscription = async (req, res) => {
  try {
    const { username } = req.user;
    const { subscriptionTypeId } = req.body;

    const updatedSubscription = await subscriptionModel.updateUserSubscription(
      username, 
      subscriptionTypeId
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
    res.json(subscription);
  });
};

module.exports = {
  getAvailableSubscriptions,
  updateSubscriptionPlan,
  updateUserSubscription,
  getActiveSubscription,
};


