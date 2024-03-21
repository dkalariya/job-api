const express=require("express")
const router = new express.Router();
const{getAllJobs,getJob,createJob,updateJob,deletejob}=require("../controller/jobs")

router.route("/").post(createJob)
router.route("/").get(getAllJobs)
router.route("/:id").get(getJob)
router.route("/:id").patch(updateJob)
router.route("/:id").delete(deletejob)



module.exports=router
