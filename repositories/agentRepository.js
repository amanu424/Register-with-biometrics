const Agent = require('../models/agent');

class AgentRepository {
    async createAgent(data) {
        const agent = new Agent(data);
        return await agent.save();
    }

    async findAgentById(id) {
        return await Agent.findById(id);
    }

    async findAllAgents() {
        return await Agent.find();
    }

    async findAgentByPhone(phone) {
    return await Agent.findOne({ phone });
  }
  
    async updateAgentById(id, data) {
        return await Agent.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteAgentById(id) {
        return await Agent.findByIdAndDelete(id);
    }

    // Additional methods can be added as needed
}

module.exports = new AgentRepository();
