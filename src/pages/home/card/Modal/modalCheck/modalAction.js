import { useEffect, useState } from "react";
import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import { successNotification, errorNotification } from "utils/notification";
import { useUpdate } from "services/requests/useUpdate";
import { useGet } from "services/requests/useGet";
import { TableStocked } from "./tableStocked";
import { TableExpense } from "./tableExpense";
import { TableDeposit } from "./tableDeposit";

import Button from "components/atoms/button/button";
import Text from "components/atoms/text/text";
import Modal from "components/molecules/modal/modal";
import ContentHeader from "components/molecules/contentHeader/contentHeader";
import Title from "components/atoms/title/title";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Loading from "components/atoms/loading/loading";

const ModalAction = ({ showModal, setShowModal, mutate, checkId }) => {
  const [fetch, setFetch] = useState(false);

  const [value, setValue] = useState(0);

  // const user = useSelector((state) => state?.user);

  const { data: check, isValidating } = useGet(
    `user/freight/${checkId}`,
    "",
    checkId ? false : true
  );

  const { data, error } = useUpdate(
    "user/freight",
    "body",
    checkId,
    fetch,
    setFetch
  );

  console.log("check", check);

  // const handleSubmitActive = (ev) => {
  //   ev.preventDefault();
  //   setBody({
  //     status: "approved",
  //     user_id: user.data.users.id,
  //     driver_id: 2,
  //   });
  //   setFetch(true);
  // };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (data) {
      mutate();
      onClose();
      successNotification(data?.success?.responseData?.msg);
    } else if (error?.response?.data?.httpStatus === 400) {
      errorNotification(error?.response?.data?.responseData?.msg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <>
            {!isValidating && (
              <Box
                sx={{
                  p: 2,
                  background: `${value === index && "#CCD6EB"}`,
                  borderRadius: "8px",
                }}
              >
                <Typography>{children}</Typography>
              </Box>
            )}

            {isValidating && <Loading />}
          </>
        )}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <Modal
      open={showModal}
      onClose={onClose}
      component="form"
      maxWidth=" 800px"
      sxGridModal={{ marginLeft: 0 }}
    >
      <ContentHeader
        mt={2}
        sx={{
          borderBottom: "2px solid #000",
          marginBottom: "15px",
          width: "96%",
        }}
      >
        <Title sxGridText={{ justifyContent: "center" }}>
          {check?.dataResult?.first_check?.start_freight_city.toUpperCase()}{" "}
          <ArrowForwardIcon style={{ verticalAlign: "middle" }} />{" "}
          {check?.dataResult?.first_check?.final_freight_city.toUpperCase()}
        </Title>
      </ContentHeader>

      {!isValidating && error && (
        <Grid item container justifyContent="center">
          <Text sx={{ color: "red" }}>
            {`Erro: ${error?.response?.data?.dataResult?.msg}`}
          </Text>
        </Grid>
      )}

      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          width: "100%",
          "& .css-heg063-MuiTabs-flexContainer": {
            justifyContent: "center",
          },
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            sx={{
              fontWeight: "700",
              borderTopRightRadius: "8px",
              borderTopLeftRadius: "8px",
              background: `${value === 0 && "#CCD6EB"}`,
            }}
            label="COTAÇÃO"
            {...a11yProps(0)}
          />
          <Tab
            sx={{
              fontWeight: "700",
              borderTopRightRadius: "8px",
              borderTopLeftRadius: "8px",
              background: `${value === 1 && "#CCD6EB"}`,
            }}
            label="ABASTECIDAS"
            {...a11yProps(1)}
          />
          <Tab
            sx={{
              fontWeight: "700",
              borderTopRightRadius: "8px",
              borderTopLeftRadius: "8px",
              background: `${value === 2 && "#CCD6EB"}`,
            }}
            label="DESPESAS"
            {...a11yProps(2)}
          />
          <Tab
            sx={{
              fontWeight: "700",
              borderTopRightRadius: "8px",
              borderTopLeftRadius: "8px",
              background: `${value === 3 && "#CCD6EB"}`,
            }}
            label="DEPOSITOS"
            {...a11yProps(3)}
          />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <Grid
          item
          container
          alignItems="flex-start"
          justifyContent="flex-start"
          minWidth={"730px"}
          maxHeight="230px"
          minHeight="230px"
        >
          {/* {isFetching && <Loading />}
              {loading && <Loading />} */}
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Grid
          item
          container
          alignItems="flex-start"
          justifyContent="flex-start"
          minWidth={"730px"}
          minHeight="230px"
          maxHeight="230px"
          overflow={"auto"}
        >
          <TableStocked data={check} />
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Grid
          item
          container
          alignItems="flex-start"
          justifyContent="flex-start"
          minWidth={"730px"}
          maxHeight="230px"
          minHeight="230px"
        >
          <TableExpense data={check} />
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={3}>
        <Grid
          item
          container
          alignItems="flex-start"
          justifyContent="flex-start"
          minWidth={"730px"}
          maxHeight="230px"
          minHeight="230px"
        >
          <TableDeposit data={check} />
        </Grid>
      </TabPanel>

      {check?.dataResult?.first_check?.status === "APPROVAL_PROCESS" &&
        !isValidating && (
          <Grid container item spacing={2} mt={1} justifyContent="flex-end">
            <Grid container item xs={12} md={3} lg={3}>
              <Button
                background={"#fff"}
                variant="text"
                sx={{
                  fontSize: "14px",
                  width: "141px",
                  height: "49px",
                  marginRight: "15px",
                  border: "1px solid #F03D3D",
                  color: "#000000",
                }}
              >
                REPROVAR
              </Button>
            </Grid>
            <Grid container item xs={12} md={3} lg={3}>
              <Button
                type="submit"
                color="success"
                background={
                  "linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)"
                }
                sx={{
                  fontSize: "14px",
                  color: "white",
                  width: "141px",
                  height: "49px",
                  marginRight: "15px",
                }}
              >
                APROVAR
              </Button>
            </Grid>
          </Grid>
        )}
    </Modal>
  );
};

export default ModalAction;