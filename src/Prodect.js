import {
  Box,
  Button,
  Card,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";
import { useState } from "react";
import images from "./logo.png";
import axios from "axios";

const apiUrl = "http://localhost:3001";

export const instance = axios.create({
  baseURL: apiUrl,
});

function Prodect() {
  const [files, setFiles] = useState("");
  const [batchName, setBatchName] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [qualification, setQualification] = useState("");
  const [passed, setPassedYear] = useState("");
  const [sslcpercentage, setSSLCPercentage] = useState("");
  const [hscpercentage, setHSCPercentage] = useState("");
  const [ugpercentage, setUGpercentage] = useState("");
  const [pgpercentage, setPGpercentage] = useState("");
  const [comments, setComments] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const handleInputChange = (event) => {
    const input = event.target.value;
    const strippedInput = input.replace(/\D/g, "").slice(0, 10);
    setPhoneNumber(strippedInput);
  };
  const handlepassedyear = (event) => {
    const passedYear = event.target.value;
    const strippedInput = passedYear.replace(/\D/g, "").slice(0, 10);
    setPassedYear(strippedInput);
  };

  const handlePercentage = (event, setPercentage) => {
    const value = event.target.value;
    const strippedInput = value.replace(/\D/g, "").slice(0, 2);
    if (strippedInput.length > 0) {
      const formattedPassedYear = `${strippedInput.slice(
        0,
        3
      )}%${strippedInput.slice(2)}`;
      setPercentage(formattedPassedYear);
    }
  };

  const handleSSLC = (event) => {
    handlePercentage(event, setSSLCPercentage);
  };

  const handleHCL = (event) => {
    handlePercentage(event, setHSCPercentage);
  };

  const handleUG = (event) => {
    handlePercentage(event, setUGpercentage);
  };

  const handlePG = (event) => {
    handlePercentage(event, setPGpercentage);
  };

  const handleSumit = async () => {
    try {
      const responce = await instance.post(
        `api/general/postCandidateinfo`,
        {
          batchName,
          candidateName,
          qualification,
          passedYear: passed,
          mobileNumber: phoneNumber,
          email,
          sslcPercentage: sslcpercentage,
          hscPercentage: hscpercentage,
          ugPercentage: ugpercentage,
          pgPercentage: pgpercentage,
          images: files,
          comments,
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (responce.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Successfully Added",
          showConfirmButton: false,
          timer: 2000,
        });
        setFiles("");
        setSSLCPercentage("");
        setCandidateName("");
        setBatchName("");
        setQualification("");
        setPassedYear("");
        setHSCPercentage("");
        setUGpercentage("");
        setPGpercentage("");
        setComments("");
        setPhoneNumber("");
        setEmail("");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "SomeThing went worng",
        timer: 2000,
      });
    }
  };

  const heading = {
    width: "55%",
    borderRadius: "8px",
    borderTop: 10,
    borderColor: " #00008B",
    "@media(max-width:600px)": {
      width: "100%",
    },
  };
  const Boxstyle2 = {
    height: "15vh",
    width: "100%",
    float: "left",
    paddingTop: "4%",
  };
  const Gridstyle = {
    display: "flex",
    justifyContent: "center",
    paddingTop: "2%",
  };
  const err =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return (
    <>
      <Grid>
        <Grid sx={Gridstyle}>
          <Card sx={heading}>
            <Box sx={Boxstyle2}>
              <Box sx={{ float: "right", paddingRight: "15%" }}>
                <img
                  src={images}
                  alt="logo"
                  style={{ borderRadius: "50%", width: "180px" }}
                />
              </Box>
            </Box>
            <Typography sx={{ paddingLeft: "13%", paddingTop: "2%" }}>
              Batch Name*
            </Typography>
            <TextField
              sx={{ width: "75%", paddingLeft: "13%", paddingTop: "1%" }}
              size="small"
              placeholder="Batch Name"
              variant="outlined"
              value={batchName}
              onChange={(e) => setBatchName(e.target.value)}
            />
            <Typography sx={{ paddingLeft: "13%", paddingTop: "2%" }}>
              Candidate Name*
            </Typography>
            <TextField
              sx={{ width: "75%", paddingLeft: "13%", paddingTop: "1%" }}
              size="small"
              placeholder="Candidate Name"
              variant="outlined"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
            />
            <Typography sx={{ paddingLeft: "13%", paddingTop: "2%" }}>
              Passed Year*
            </Typography>
            <TextField
              sx={{ width: "75%", paddingLeft: "13%", paddingTop: "1%" }}
              size="small"
              placeholder=" Passed Year"
              variant="outlined"
              value={passed}
              onChange={handlepassedyear}
            />
            <Typography sx={{ paddingLeft: "13%", paddingTop: "2%" }}>
              Mobile Number*
            </Typography>
            <TextField
              sx={{ width: "75%", paddingLeft: "13%", paddingTop: "1%" }}
              size="small"
              placeholder="Mobile number"
              variant="outlined"
              value={phoneNumber}
              onChange={handleInputChange}
            />
            <Typography sx={{ paddingLeft: "13%", paddingTop: "2%" }}>
              {" "}
              Email*
            </Typography>
            <TextField
              sx={{
                width: "75%",
                paddingLeft: "13%",
                paddingTop: "1%",
                border: `${email ? "none" : "red"}`,
              }}
              size="small"
              placeholder="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={email && !err.test(String(email).toLowerCase())}
            />
            <Typography sx={{ paddingLeft: "13%", paddingTop: "2%" }}>
              Qualification*
            </Typography>
            <RadioGroup
              sx={{ paddingLeft: "30%" }}
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
            >
              <FormControlLabel value="BCA" control={<Radio />} label="BCA" />
              <FormControlLabel value="CS" control={<Radio />} label="CS" />
              <FormControlLabel value="MCA" control={<Radio />} label="MCA" />
              <FormControlLabel value="MBA" control={<Radio />} label="MBA" />
              <FormControlLabel
                value="B.COM"
                control={<Radio />}
                label="B.COM"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
            <Typography sx={{ paddingLeft: "13%", paddingTop: "2%" }}>
              SSLC Percentage*
            </Typography>
            <TextField
              sx={{ width: "75%", paddingLeft: "13%", paddingTop: "1%" }}
              size="small"
              placeholder="SSLC Percentage"
              variant="outlined"
              value={sslcpercentage}
              onChange={handleSSLC}
            />
            <Typography sx={{ paddingLeft: "13%", paddingTop: "2%" }}>
              HSC Percentage*
            </Typography>
            <TextField
              sx={{ width: "75%", paddingLeft: "13%", paddingTop: "1%" }}
              size="small"
              placeholder="HSC Percentage"
              variant="outlined"
              value={hscpercentage}
              onChange={handleHCL}
            />
            <Typography sx={{ paddingLeft: "13%", paddingTop: "2%" }}>
              UG Percentage*
            </Typography>
            <TextField
              sx={{ width: "75%", paddingLeft: "13%", paddingTop: "1%" }}
              size="small"
              placeholder="UG Percentage"
              variant="outlined"
              value={ugpercentage}
              onChange={handleUG}
            />
            <Typography sx={{ paddingLeft: "13%", paddingTop: "2%" }}>
              PG Percentage*
            </Typography>
            <TextField
              sx={{ width: "75%", paddingLeft: "13%", paddingTop: "1%" }}
              size="small"
              placeholder="PG Percentage"
              variant="outlined"
              value={pgpercentage}
              onChange={handlePG}
            />
            <Typography sx={{ paddingLeft: "13%", paddingTop: "2%" }}>
              Image*
            </Typography>
            <Box sx={{ paddingLeft: "13%" }}>
              <input
                class="form-control custom-file-input"
                type="file"
                id="formFile"
                onChange={(image) => setFiles(image.target.files[0])}
              />
            </Box>
            <Typography sx={{ paddingLeft: "13%", paddingTop: "2%" }}>
              {"Comments(Optional)*"}
            </Typography>
            <TextField
              sx={{
                width: "75%",
                paddingLeft: "13%",
                paddingTop: "1%",
                paddingBottom: "5%",
              }}
              size="small"
              rows={5}
              multiline
              placeholder="Comments"
              variant="outlined"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
            <Box sx={{ width: "88%", paddingBottom: "10%" }}>
              <Box sx={{ float: "right" }}>
                <Button
                  sx={{
                    background: "#00008B",
                    "&:hover": { background: "#00008B" },
                  }}
                  variant="contained"
                  onClick={handleSumit}
                >
                  Submit
                </Button>
              </Box>
            </Box>
            <br />
            {/* <>
          {' '}
          <Dialog open={selecterrorpage} onClose={handleCloseErrorModal}>
            <DialogTitle>Error</DialogTitle>
            <DialogContent>Please fill out all required fields.</DialogContent>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="contained" onClick={handleClickclose} sx={{ height: '5vh', width: '30%' }}>
                Ok
              </Button>
            </Box>

            <br />
          </Dialog>{' '}
        </>{' '}
        <>
          {' '}
          <Dialog open={pagesucess} onClose={handleCloseErrorModal}>
            <DialogTitle>Success</DialogTitle>
            <DialogContent>Form submitted successfully.</DialogContent>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="contained" onClick={handleClickclose} sx={{ height: '5vh', width: '30%' }}>
                Ok
              </Button>
            </Box>

            <br />
          </Dialog>{' '} */}
            {/* </> */}
          </Card>
        </Grid>
      </Grid>
      <br />
    </>
  );
}

export default Prodect;
