const subscriptionModel = require('../models/subscription');

const deletePlan = async (req, res) => {
    try {
      const planId = req.params.planId;
      const newPlanId = req.body.newPlanId; 
      const affectedUsers = await subscriptionModel.getAffectedUsers(planId);
      if (!affectedUsers) {
        return res.status(500).json({ error: 'Failed to retrieve affected users' });
      }
      if (affectedUsers.length === 0) {
        const result = await subscriptionModel.deletePlan(planId);
        if (result) {
          console.log('Subscription plan deleted successfully');
          res.status(200).json({ message: 'Subscription plan deleted successfully' });
        } else {
          res.status(500).json({ error: 'Failed to delete subscription plan' });
        }
      }else {
        if (!newPlanId) {
          return res.status(400).json({ error: 'New plan ID is required for affected users.' });
        }
        const userIds = affectedUsers.map((user) => user.signup_id);
        const transferred = await subscriptionModel.transferUsersToNewPlan(userIds, newPlanId);
        if (!transferred) {
          return res.status(500).json({ error: 'Failed to transfer users to the new plan.' });
        }
        const result = await subscriptionModel.deletePlan(planId);
        if (result) {
          console.log('Subscription plan deleted successfully');
          res.status(200).json({ message: 'Subscription plan deleted successfully' });
        } else {
          res.status(500).json({ error: 'Failed to delete subscription plan' });
        }
      }
    } catch (error) {
      console.error('Error deleting subscription plan:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const createNewPlan = async (req, res) => {
    try {
      const {type, details, price ,duration} = req.body; 
      console.log(req.body)
      const newPlanId = await subscriptionModel.createSubscriptionPlan( type, details, price,duration);
      if (newPlanId) {
        res.status(201).json({ message: 'Subscription plan created successfully', planId: newPlanId });
        console.log('Subscription plan created successfully', newPlanId)
      } 
    } catch (error) {
      console.error('Error creating subscription plan:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  
module.exports = {
  deletePlan,
  createNewPlan,
};