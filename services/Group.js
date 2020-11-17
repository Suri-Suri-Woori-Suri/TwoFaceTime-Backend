module.exports = class GroupService {
  constructor(userModel, groupModel) {
    this.userModel = userModel;
    this.groupModel = groupModel;
  }

  async findMembers(groupId) {
    try {
      const groupData = await this.groupModel.findById(groupId).exec();
      console.log("########", groupData);
      const { members } = groupData;

      return members;
    } catch (err) {
      console.error(err);
    }
  }

  async addMembers(groupId, membersArray) {
    try {
      const groupData = await this.groupModel.update({ _id: groupId }, { $push: { members: { $each: membersArray } } }).exec();
      return groupData;
    } catch (err) {
      console.error(err);
    }
  }

  async deleteMembers(groupId, membersArray) {
    try {
      const groupData = await this.groupModel.updateMany({ _id: groupId }, { $pull: { members: { $in: membersArray } } }).exec();
      return groupData;
    } catch (err) {
      console.error(err);
    }
  }

  async createGroup(newGroupData) {
    try {
      return await this.groupModel.create(newGroupData);
    } catch (err) {
      console.error(err);
    }
  }

  async deleteGroups(arrayOfGroupObjectId) {
    try {
      arrayOfGroupObjectId.forEach(async(id) => {
        await this.groupModel.deleteOne({ '_id': id });
      });
      return;
    } catch (err) {
      console.error(err);
    }
  }
};
