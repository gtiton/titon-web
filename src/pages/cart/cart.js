import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { IconAdd } from "components/atoms/icons/icons";
import { InputSearches } from "components/atoms/input/inputSearches/input";
import { useGet } from "services/requests/useGet";

import Table from "./table";
import ModalAddCart from "./modalAddCart";
import Button from "components/atoms/button/button";

const Cart = () => {
  const [showModalDriver, setShowModalDriver] = useState(false);

  const INITIAL_STATE_CARD = {
    limit: 10,
    page: 1,
    sort_field: null,
    sort_order: "ASC",
  };

  const [cardQuery, setCardQuery] = useState(INITIAL_STATE_CARD);
  const [search, setSearch] = useState("");

  const {
    data: cards,
    error: cardsError,
    isFetching: cardsIsFetching,
    loading,
    mutate,
  } = useGet("/carts", cardQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCardQuery((state) => ({
        ...state,
        search: search,
      }));
    }, 1200);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <Grid
      item
      container
      padding={1}
      spacing={2}
      minHeight="88vh"
      justifyContent="center"
      alignContent={"flex-start"}
    >
      <Grid item container pl={2} mr={4} mt={-6.5} justifyContent={"flex-end"}>
        <Button
          onClick={() => setShowModalDriver(true)}
          background={
            "linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)"
          }
          sx={{
            fontSize: "14px",
            color: "white",
            width: "228px",
            height: "40px",
            marginRight: "15px",
          }}
        >
          Adicionar Carreta <IconAdd sx={{ mt: -0.7 }} />
        </Button>
        <InputSearches
          searches
          searchesType={"searches"}
          styles={{ minWidth: "350px" }}
          placeholder={"Nome, placa..."}
          onChange={(ev) => setSearch(ev.target.value)}
        />
      </Grid>
      <Grid
        item
        container
        mb={5}
        minHeight={"100%"}
        alignItems="flex-start"
        justifyContent="flex-start"
      >
        <Grid
          item
          container
          pl={2}
          mr={4}
          mt={5}
          mb={3}
          justifyContent={"center"}
        >
          <Table
            data={cards}
            query={cardQuery}
            setQuery={setCardQuery}
            isFetching={cardsIsFetching}
            error={cardsError}
            loading={loading}
            mutate={mutate}
          />
        </Grid>
      </Grid>

      <ModalAddCart
        setShowModal={setShowModalDriver}
        showModal={showModalDriver}
        mutate={mutate}
      />
    </Grid>
  );
};

export default Cart;
