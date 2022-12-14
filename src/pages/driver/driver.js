import { useState } from "react";
import { Grid } from "@mui/material";
import { useGet } from "services/requests/useGet";
import { IconAdd } from "components/atoms/icons/icons";

import Table from "./table";
import ModalAddDriver from "./modalAddDriver";
import Button from "components/atoms/button/button";
import Input from "components/atoms/input/input";

const Driver = () => {
  const [showModalDriver, setShowModalDriver] = useState(false);
  
  const INITIAL_STATE_DRIVER = {
    limit: 10,
    page: 1,
    sort_field: null,
    sort_order: "ASC",
  };

  const [driverQuery, setDriverQuery] = useState(INITIAL_STATE_DRIVER);

  const {
    data: drivers,
    error: driversError,
    isFetching: driversIsFetching,
    loading, 
    mutate,
  } = useGet(
    "/drivers", 
    driverQuery
  );

  return (
    <Grid
      container
      justifyContent="center"
      minHeight="88vh"
      padding={1}
      spacing={2}
    >
      <Grid
        item 
        container 
        pl={2} 
        mr={4} 
        mt={-6.5} 
        justifyContent={"flex-end"}
      >
        <Button 
          onClick={() => setShowModalDriver(true)}
          background={"linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)"}
          sx={{
            fontSize: "14px",
            color: "white",
            width: "228px",
            height: "40px",
            marginRight: "15px",
          }}
        >
          Adicionar Motorista <IconAdd sx={{ mt: -0.7 }} />
        </Button>
        <Input
          searches
          searchesType={"searches"}
          styles={{ minWidth: "350px"}}
          placeholder={"Nome, placa..."}
          // onChange={(ev) => setEmail(ev.target.value)}
          required
        />   
      </Grid>
      <Grid
        item
        container
        mt={-20}
        mb={5}
        minHeight={'100%'}
        alignItems="flex-start"
        justifyContent="flex-start"
      >
        <Grid item container pl={2} mr={4} mt={5} mb={3} justifyContent={"center"}>
          <Table
            data={drivers}
            query={driverQuery}
            setQuery={setDriverQuery}
            isFetching={driversIsFetching}
            error={driversError}
            loading={loading}
            mutate={mutate}
          />
        </Grid>        
      </Grid>

      <ModalAddDriver 
        setShowModal={setShowModalDriver}
        showModal={showModalDriver}
        mutate={mutate}
      />
    </Grid>
  );
};

export default Driver;
