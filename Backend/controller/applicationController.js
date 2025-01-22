const  {
    insertApplication,
    findApplication,
    findApplicationById,
    deleteApplication,
    updateApplication,
    findApplicationByCompanyOrRole,
    findApplicationsByStatus
} = require("../services/applicationService")

const addApplication = async (req, res) => {
  try {
    const {position, company, date} = req.body;
    if (!position, !company, !date) return res.status(400).json("missing credentails for adding Application");
       req.body.userId = req.user
      const application = await insertApplication(req.body)
      return res.status(200).json({application,message:"task created successfully"})
  } catch (error) {
    return res.status(500).json(error.message)
  }                      
};

const fetchApplication = async(req,res)=>{
    try {
          const {page} =  req.query;
          const applications =  await findApplication(req.user,page)
          return res.status(200).json(applications)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const findOneApplication = async(req,res) =>{
    try {
        const {id} = req.query
        if(!id)  return res.status(400).json("id needed to findOne task")
        const application = await findApplicationById(id,req.user)
        return res.status(200).json(application)
    } catch (error) {
        return res.status(500).json(error.message)

    }
}

const handleApplicationDelete = async(req,res)=> {
    try {
        const {id} = req.query;
        if(!id) return res.status(400).json("id is required to delete the task")
        const response = await deleteApplication(id)
        return res.status(200).json("task deleted successfully")
    } catch (error) {
        return res.status(500).json(error.message)
    }
}
                     
const handleApplicationEdit = async (req,res) =>{   
    try {
        const {application,id} =  req.body;
        if(!id || !application) return res.status(400).json("id and application is required to update the application")
        const response = await updateApplication(id,application)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const handleSearch = async(req,res)=>{
    try {
        const {query} = req.query;
        if(!query) return res.status(400).json("query required to search")
        const applications = await findApplicationByCompanyOrRole(query,req.user)
        return res.status(200).json(applications)
     } catch (error) {
        return res.status(500).json(error.message)
     }
    }

    const filterByStatus = async(req,res)=>{
        try {
             const {status,page} =  req.query;
             const applications =  await findApplicationsByStatus(status,req.user,page)
             return res.status(200).json(applications)
        } catch (error) {
             return res.status(500).json(error.message)
        }
    }




module.exports = {
  addApplication,
  fetchApplication,
  findOneApplication,
  handleApplicationDelete,
  handleApplicationEdit,
  handleSearch,
  filterByStatus
};  
