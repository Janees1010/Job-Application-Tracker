const Application = require("../model/applicationModel");

const insertApplication = async (application) => {
  try {
    const newTask = await Application.create(application);
    return newTask;
  } catch (error) {
    throw new Error(`error adding application : ${error.message}`);
  }
};

const findApplication = async (userId) => {
  try {
    const applications = await Application.find({ userId });
    return applications;
  } catch (error) {
    throw new Error(`error fetching application : ${error.message}`);
  }
};

const findApplicationById = async (id, userId) => {
  try {
    const task = await Application.findOne({ _id: id, userId });
    return task;
  } catch (error) {
    throw new Error(`error fetching application : ${error.message}`);
  }
};

const deleteApplication = async (id) => {
  try {
    const response = await Application.findByIdAndDelete(id);
    return response;
  } catch (error) {
    throw new Error(`error deleting application : ${error.message}`);
  }
};

const updateApplication = async (id, data) => {
  try {
    const response = await Application.findByIdAndUpdate(id, data, { new: true });
    return response;
  } catch (error) {
    throw new Error(`error updating application : ${error.message}`);
  }
};

module.exports = {
  insertApplication,
  findApplication,
  findApplicationById,
  deleteApplication,
  updateApplication,
};
