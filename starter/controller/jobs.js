const { StatusCodes } = require("http-status-codes");
const Job = require("../model/Job")

//ONLY LOGIN PERSON SEE THEIR CREATE JOBS(ONLYN THEIR NOT ALL)
const getAllJobs = async (req, res) => {
    // const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')
    const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
}

const getJob = async (req, res) => {
    // const _id = req.params.id; // Extract _id from URL parameters
    const { user: { userId },params:{id:jobId} } = req;

    try {
        const singleJob = await Job.findOne({ id:jobId, createdBy: userId });
        
        if (!singleJob) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Job not found" });
        }
        res.status(StatusCodes.OK).json({ singleJob });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server error");
    }
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}
const updateJob = async (req, res) => {
    const {
        body: { company, position },
        user: { userId },
        params: { id: jobId } 
    }=req

  if (company === '' || position === '') {
   return res.send('Company or Position fields cannot be empty')
  }
  const job=await Job.findByIdAndUpdate({ _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true })

    if (!job) {
        return res.send(`No job with id ${jobId}`)
      }
      res.status(StatusCodes.OK).json({ job })
}

//ONLY JENE JOB CREATE KARI HASE EJ DELETE KARI SAKSE(I MEAN ONLY LOGIN USER.)
const deletejob = async (req, res) => {
    const {
        user: { userId },
        params: { id: jobId }
    } = req;

    try {
        const jobdelete = await Job.findOneAndDelete({
            _id: jobId,
            createdBy: userId,
        });
            console.log(jobId)
        if (!jobdelete) {
            return res.status(StatusCodes.NOT_FOUND).send(`No job with id ${jobId}`);
        }
        
        res.status(StatusCodes.OK).send();
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server error");
    }
}



module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deletejob
}