const Application = require("../model/applicationModel");

const insertApplication = async (application) => {
  try {
    const newTask = await Application.create(application);
    return newTask;
  } catch (error) {
    throw new Error(`error adding application : ${error.message}`);
  }
};

const findApplication = async (userId, page) => {
  try {
    const limit = 2;
    const skip = (page - 1) * limit;
    const applications = await Application.find({ userId }).skip(skip).limit(2);
    const totalCount = await Application.countDocuments();
    return { applications, totalCount };
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
    const response = await Application.findByIdAndUpdate(id, data, {
      new: true,
    });
    return response;
  } catch (error) {
    throw new Error(`error updating application : ${error.message}`);
  }
};

const findApplicationByCompanyOrRole = async (query, userId) => {
  try {
    const applications = await Application.find({
      userId,
      $or: [
        { company: new RegExp(query, "i") },
        { position: new RegExp(query, "i") },
      ],
    });
    console.log(applications, "search result");
    return applications;
  } catch (error) {
    throw new Error(`error finding application : ${error.message}`);
  }
};

const findApplicationsByStatus = async (status, userId, page) => {
  try {
    const limit = 2;
    const skip = (page - 1) * limit;
    const applications = await Application.find({ userId, status })
    return applications;
  } catch (error) {
    throw new Error(`error filtering application by status : ${error.message}`);
  }
}; 

module.exports = {
  insertApplication,
  findApplication,
  findApplicationById,
  deleteApplication,
  updateApplication,
  findApplicationByCompanyOrRole,
  findApplicationsByStatus,
};
