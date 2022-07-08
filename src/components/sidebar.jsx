import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";
import { FiBox, FiHeart, FiDollarSign, FiChevronRight } from "react-icons/fi";
import axios from "axios";
import { Content } from "../components/Content";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { styled } from "@mui/material/styles";

export function SidebarUser() {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  useEffect(() => {
    const validateLogin = async (e) => {
      try {
        // Check status user login
        // 1. Get token from localStorage
        const token = localStorage.getItem("token");

        // 2. Check token validity from API
        const currentUserRequest = await axios.get(
          "http://localhost:2000/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const currentUserResponse = currentUserRequest.data;
        console.log(currentUserResponse);

        if (currentUserResponse.status) {
          setUser(currentUserResponse.data.user);
        }
      } catch (err) {
        console.log(err);
        setIsLoggedIn(false);
      }
    };
    validateLogin();
  }, []);

  const buttonStyle = {
    border: "1px solid rgba(113, 38, 181, 1)",
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: "8px",
  };

  return (
    <>
      {isLoggedIn ? (
        <div className="navigasi-user">
          <Card className="p-3">
            <div className="d-flex gap-3">
              <Card.Img
                src={`http://localhost:2000/public/files/${user.picture}`}
                style={{ width: "5%" }}
              />
              <div>
                <Card.Text className="mb-0 fw-bold">{user.name}</Card.Text>
                <Card.Text>{user.city}</Card.Text>
              </div>
              <Button
                href={`/updateaccv2/${user.id}`}
                size="sm"
                className="ms-auto align-self-center text-black px-3 fw-400"
                style={buttonStyle}
              >
                Edit
              </Button>
            </div>
            <div></div>
          </Card>
        </div>
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export function SidebarFix() {
  const Root = styled("div")(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  const styledV1 = {
    padding: "10px",
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.15)",
    borderRadius: "16px",
  };

  const styledV2 = {
    fontSize: "16px",
  };

  const styledV3 = {
    fontSize: "16px",
    borderBottom: "1px solid black",
  };
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Row className="mt-3">
        <Col md={3}>
          <Box
            sx={{ width: "100%", typography: "body1" }}
            className="sidebar-category-responsive mb-2"
          >
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab
                    label={
                      <span className="d-flex align-self-center gap-2">
                        <FiBox className="align-self-center" />{" "}
                        <span className="fw-bold">Produk</span>
                      </span>
                    }
                  />
                  <Tab
                    label={
                      <span className="d-flex align-self-center gap-2">
                        <FiHeart className="align-self-center" />{" "}
                        <span className="fw-bold">Diminati</span>
                      </span>
                    }
                  />
                  <Tab
                    label={
                      <span className="d-flex align-self-center gap-2 ">
                        <FiDollarSign className="align-self-center" />{" "}
                        <span className="fw-bold">Terjual</span>
                      </span>
                    }
                  />
                </TabList>
              </Box>
            </TabContext>
          </Box>

          <Root>
            <div classname="sidebar-category-desktop " style={styledV1}>
              <h6 className="fw-bold pt-2 px-2">Kategori</h6>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
              >
                <Tab
                  label={
                    <div style={styledV3}>
                      <FiBox /> <span className="fw-bolder">Produk</span>
                      <FiChevronRight />
                    </div>
                  }
                  {...a11yProps(0)}
                />
                <Tab
                  label={
                    <div style={styledV3}>
                      <FiHeart /> <span className="fw-bolder">Diminati</span>
                      <FiChevronRight />
                    </div>
                  }
                  {...a11yProps(1)}
                />
                <Tab
                  label={
                    <div style={styledV2}>
                      <FiDollarSign />{" "}
                      <span className="fw-bolder ">Terjual</span>
                      <FiChevronRight />
                    </div>
                  }
                  {...a11yProps(2)}
                />
              </Tabs>
            </div>
          </Root>
        </Col>

        <Col md={9}>
          <div>
            <TabPanel value={value} index={0}>
              <Content />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <div>ferdi</div>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <div>lalu</div>
            </TabPanel>
          </div>
        </Col>
      </Row>
    </>
  );
}
