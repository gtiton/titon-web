import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useGet } from "services/requests/useGet";
import { moneyMask } from "utils/masks";
import { IconMenuTruck } from "components/atoms/icons/icons";
import { formatDate } from "utils/formatDate";
import { HiOutlinePlusSm } from "react-icons/hi";
import { ModalFinalizeRecord } from "../modalFinalizeRecord";

import Table from "./table";
import Title from "components/atoms/title/title";
import ContentHeader from "components/molecules/contentHeader/contentHeader";
import Modal from "components/molecules/modal/modal";
import Text from "components/atoms/text/text";
import Button from "components/atoms/button/button";
import ModalAddFreight from "../modalAddFreight";

const status = [
  { value: "APPROVAL_PROCESS", label: "ANALISE", color: "#FFCE52" },
  { value: "APPROVED", label: "APROVADO", color: "#0BB07B" },
  { value: "DENIED", label: "NEGADO", color: "#F03D3D" },
  { value: "FINISHED", label: "FINALIZADO", color: "#86878A" },
];

const notificações = [
  { id: 1, label: "Vulcanização de pneu efetuada ", date: "16/11/2022" },
  { id: 2, label: "Abastecimento de 50l de Diesel", date: "16/11/2022" },
  { id: 3, label: "Troca de oléo do freio", date: "16/11/2022" },
];

export const ModalInfoFinancial = ({
  showModal,
  setShowModal,
  financialId,
}) => {
  const getStatus = (res) => status.find((item) => item.value === res) ?? "";

  const INITIAL_STATE_USER = {
    limit: 10,
    page: 1,
    sort_field: null,
    sort_order: "ASC",
  };

  const [userQuery, setUserQuery] = useState(INITIAL_STATE_USER);

  const [showModalFinalizeRecord, setShowModalFinalizeRecord] = useState(false);
  const [showModalAddFreight, setShowModalAddFreight] = useState(false);

  const {
    data: financial,
    error: financialError,
    isFetching: financialIsFetching,
    loading,
    mutate,
  } = useGet(
    `user/financialStatement/${financialId?.id}`,
    [],
    financialId ? false : true
  );

  const onClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <Modal
        open={showModal}
        onClose={onClose}
        component="form"
        maxWidth="1200px"
        height={"760px"}
        maxHeight={"760px"}
      >
        <ContentHeader mt={2}>
          <Title>{financial?.dataResult.truck_board}</Title>
        </ContentHeader>

        <Grid
          container
          justifyContent="center"
          padding={"30px 15px"}
          spacing={2}
        >
          <Grid
            item
            xs={6}
            md={3}
            lg={3}
            container
            flexDirection={"column"}
            alignItems="flex-start"
            justifyContent="flex-start"
            paddingTop={"0!important"}
            sx={{
              borderRight: "1px solid #000000",
            }}
          >
            <Card
              sx={{
                minWidth: "264px!important",
                minHeight: "615px!important",
                boxShadow: "none!important",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "0px",
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    fontSize: "1.2rem",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="150px"
                    sx={{
                      borderRadius: "8px",
                      width: "248px",
                      height: "185px",
                    }}
                    image={financial?.dataResult?.truck_avatar}
                    alt="green iguana"
                  />
                </Typography>

                <Grid
                  item
                  container
                  pl={2}
                  mt={1}
                  spacing={1}
                  height="100%"
                  flexDirection={"column"}
                  sx={{
                    color: "#2B2B2C",
                    lineHeight: "25px",
                  }}
                >
                  <Grid
                    container
                    item
                    pb={2}
                    paddingLeft={"0!important"}
                    pr={"8px!important"}
                    justifyContent={"space-between"}
                  >
                    <Text
                      fontSize={"19px"}
                      color={
                        getStatus(financial?.dataResult?.freigth[0]?.status)
                          .color
                      }
                    >
                      {
                        getStatus(financial?.dataResult?.freigth[0]?.status)
                          .label
                      }
                    </Text>
                  </Grid>
                  <Text fontSize={"16px"}>
                    Motorista:{" "}
                    <Text fontSize={"16px"}>
                      {financial?.dataResult?.driver_name}
                    </Text>
                  </Text>
                  <Text fontSize={"16px"}>
                    Data de Inicio:{" "}
                    <Text fontSize={"16px"}>
                      {formatDate(financial?.dataResult?.start_date)}
                    </Text>
                  </Text>
                  <Text fontSize={"16px"}>
                    Destino:{" "}
                    <Text fontSize={"16px"}>
                      {financial?.dataResult?.freigth[0]?.final_freight_city}
                    </Text>
                  </Text>
                  <Text fontSize={"16px"}>
                    Crédito:{" "}
                    <Text fontSize={"16px"}>
                      {moneyMask(financial?.dataResult?.total_value || [0])}
                    </Text>
                  </Text>
                  <Text>
                    <IconMenuTruck
                      sx={{ fontSize: "30px", color: "#509BFB" }}
                    />{" "}
                    <Text fontSize={"18px"} sx={{ verticalAlign: "super" }}>
                      {financial?.dataResult.cart_models}
                    </Text>
                  </Text>
                </Grid>
              </CardContent>

              <Grid item container mt={18} xs={12} md={12} lg={12}>
                <Text
                  fontSize={"24px"}
                  sx={{ verticalAlign: "super", fontWeight: "700" }}
                >
                  Faturamento:{" "}
                  <Text fontSize={"24px"} sx={{ fontWeight: "500" }}>
                    R$ 8.000
                  </Text>
                </Text>
                <Button
                  onClick={() =>
                    setShowModalFinalizeRecord(!showModalFinalizeRecord)
                  }
                  background={"#F03D3D"}
                  sx={{
                    width: "153px",
                    mt: 2,
                    height: "49px",
                    "&:hover": {
                      backgroundColor: "#F03D3D",
                    },
                  }}
                >
                  Finalizar Ficha
                </Button>
              </Grid>
            </Card>
          </Grid>

          <Grid
            item
            container
            xs={6}
            md={9}
            lg={9}
            flexDirection={"column"}
            alignItems="flex-start"
            justifyContent="flex-start"
          >
            <Text
              fontSize={"24px"}
              sx={{
                fontWeight: "500",
                background: "#fff",
                color: "#000000",
              }}
            >
              Notificações
            </Text>

            <Grid
              item
              container
              alignItems="flex-start"
              justifyContent="space-between"
              borderRadius={"4px"}
              padding={2}
              m={"12px 0 40px"}
              sx={{
                background: "#CCD6EB",
              }}
            >
              {notificações.map((item) => (
                <React.Fragment key={item.id}>
                  <Text>{item.label}</Text> <Text>{item.date}</Text>
                  <Divider
                    sx={{
                      my: 1,
                      mt: 1,
                      width: "100%",
                      opacity: "0.5",
                      background: "#2B2B2C",
                    }}
                  />
                </React.Fragment>
              ))}
            </Grid>

            <Grid
              item
              container
              alignItems="flex-start"
              justifyContent="flex-start"
              maxHeight={"280px"}
              overflow={"scroll"}
            >
              <Table
                data={financial}
                query={userQuery}
                setQuery={setUserQuery}
                isFetching={financialIsFetching}
                error={financialError}
                loading={loading}
                mutate={mutate}
              />
            </Grid>

            <Grid
              item
              container
              justifyContent="flex-end"
              alignItems={"flex-end"}
              m={"20px 0 0 0"}
            >
              <IconButton
                aria-label="add cards"
                onClick={() => setShowModalAddFreight(!showModalAddFreight)}
                component="label"
                sx={{
                  color: "#F1F3F9",
                  background: "#1877F2",
                  "&:hover": {
                    background: "#1877F2",
                    opacity: "0.8",
                  },
                }}
              >
                <HiOutlinePlusSm fontSize={"42px"} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Modal>

      {showModalAddFreight && (
        <ModalAddFreight
          financialId={financialId?.id}
          showModal={showModalAddFreight}
          setShowModal={setShowModalAddFreight}
        />
      )}

      {showModalFinalizeRecord && (
        <ModalFinalizeRecord
          mutate={mutate}
          financialId={financialId?.id}
          props={financial}
          setShowModal={setShowModalFinalizeRecord}
          showModal={showModalFinalizeRecord}
        />
      )}
    </>
  );
};