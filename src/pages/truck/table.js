import React, { useState } from "react";
import { Grid, Paper, TableContainer } from "@mui/material";
import { useTranslation } from "react-i18next";
import { TablePagination } from "components/atoms/tablePagination/tablePagination";
import { useMediaQuery } from "react-responsive";
import {
  SCell,
  SHead,
  SRow,
  STable,
  STableBody,
  SLabel,
} from "components/atoms/table/table";

import InfoRow from "./infoRow";
import imgNotFound from "../../assets/trist-not-found-table.svg";
import Text from "components/atoms/text/text";
import Loading from "components/atoms/loading/loading";
import ModalDeleteTruck from "./modalDeleteTruck";
import ModalUpdateTruck from "./modalUpdateTruck";

const Table = ({
  data,
  query,
  setQuery,
  isFetching,
  mutate,
  error,
  loading,
}) => {
  const { t } = useTranslation();

  const isDesktop = useMediaQuery({ maxWidth: "1250px" });
  const isMobile = useMediaQuery({ maxWidth: "730px" });

  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);

  const [truckId, setTruckId] = useState(null);

  const handleSort = (item) => {
    setQuery((state) => ({
      ...state,
      sort_field: item,
      sort_order: `${query?.sort_order === "ASC" ? "DESC" : "ASC"}`,
    }));
    return;
  };

  return (
    <>
      <TableContainer component={Paper}>
        <STable>
          <SHead>
            <SRow>
              <SCell displaywidth={isDesktop ? 0 : 1}>Info</SCell>
              <SCell>
                <SLabel
                  active={query?.sort_field === "truck_name_brand"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("truck_name_brand")}
                >
                  Marca
                </SLabel>
              </SCell>
              <SCell displaywidth={isMobile ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "truck_models"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("truck_models")}
                >
                  Modelo
                </SLabel>
              </SCell>
              <SCell displaywidth={isMobile ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "truck_board"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("truck_board")}
                >
                  Placa
                </SLabel>
              </SCell>
              <SCell displaywidth={isMobile ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "truck_color"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("truck_color")}
                >
                  Cor
                </SLabel>
              </SCell>
              <SCell displaywidth={isMobile ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "truck_km"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("truck_km")}
                >
                  KM
                </SLabel>
              </SCell>
              <SCell displaywidth={isMobile ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "truck_chassis"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("truck_chassis")}
                >
                  Número Chassi
                </SLabel>
              </SCell>
              <SCell displaywidth={isMobile ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "truck_year"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("truck_year")}
                >
                  Ano Fabricação
                </SLabel>
              </SCell>
              <SCell displaywidth={isDesktop ? 1 : 0}>Avatar</SCell>
              <SCell displaywidth={isDesktop ? 1 : 0}>Ações</SCell>
            </SRow>
          </SHead>
          {!isFetching && data && data?.dataResult?.length > 0 && (
            <>
              <STableBody>
                {data.dataResult.map((item, index) => (
                  <InfoRow
                    key={item.id}
                    data={item}
                    index={index}
                    setTruckId={setTruckId}
                    setShowModalDelete={setShowModalDelete}
                    setShowModalUpdate={setShowModalUpdate}
                  />
                ))}
              </STableBody>
            </>
          )}
        </STable>

        {!isFetching &&
          data?.dataResult?.length > 0 &&
          data?.totalPages > 0 && (
            <Grid item justifyContent="center" alignItems="center">
              <TablePagination data={data} query={query} setQuery={setQuery} />
            </Grid>
          )}

        {(loading || isFetching) && (
          <Grid container justifyContent="center" alignItems="center" mt={3}>
            <Loading titulo={t("messages.loading")} />
          </Grid>
        )}

        {data?.dataResult?.length === 0 && !isFetching && (
          <Grid item justifyContent="center" alignItems="center" pt={5}>
            <Text fontSize={"28px"} center>
              {"RESULTADO NÃO ENCONTRADO..."}
              <img
                src={imgNotFound}
                alt="img"
                width={"40px"}
                style={{
                  verticalAlign: "bottom",
                  marginLeft: "24px",
                }}
              />
            </Text>
          </Grid>
        )}

        {error && (
          <Grid item justifyContent="center" alignItems="center" pt={5}>
            <Text fontSize={"28px"} center>
              {t("messages.unknown_error").toUpperCase()}
            </Text>
          </Grid>
        )}
      </TableContainer>

      {showModalDelete && (
        <ModalDeleteTruck
          setShowModal={setShowModalDelete}
          showModal={showModalDelete}
          props={truckId}
          mutate={mutate}
        />
      )}

      {showModalUpdate && (
        <ModalUpdateTruck
          setShowModal={setShowModalUpdate}
          showModal={showModalUpdate}
          props={truckId}
          mutate={mutate}
        />
      )}
    </>
  );
};

export default Table;
