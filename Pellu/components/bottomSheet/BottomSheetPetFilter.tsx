import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useBottomSheet } from "./BottomSheetContext";
import { PetType } from "../../types/offer.type";
import PrimaryButton from "../primaryButton/PrimaryButton";
import Text from "../text/Text";
import SearchBarView from "../../navigator/stacks/home/homeScreen/components/searchBarView/SearchBarView";
import { OngApi } from "../../apis/ong.api";
import { getLocation } from "../../utils/Location";
import { IOng } from "../../types/ong.type";
import Loading from "../loading/Loading";
import OngTypeFilter from "./components/ongTypeFilter/ongTypeFilter";
import PetTypeFilter from "./components/petTypeFilter/petTypeFilter";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type Props = {
  isVisible: boolean;
  close: () => void;
}

const BottomSheetPetFilter = ({ isVisible, close }: Props) => {
  const { petFilterData } = useBottomSheet();

  const [petType, setPetType] = useState<PetType | undefined>(undefined);
  const [search, setSearch] = useState<string>('');
  const [ongs, setOngs] = useState<IOng[]>([]);
  const [ongFilterId, setOngFilterId] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFilter = () => {
    petFilterData?.handleFilter(petType, ongFilterId);
    close();
  }

  const searchOngs = () => {
    setLoading(true);
    getLocation().then(async location => {
      const coords = location?.coords;
      const res = await OngApi.getAll(coords?.latitude, coords?.longitude, search);
      setOngs(res);
    }).catch(e => {
      Alert.alert("Erro de localização", "Para buscar as ONGs próximas, precisamos da sua localização.");
    }).finally(() => {
      setLoading(false);
    });
  }

  if (!isVisible) return null;
  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.body}>
          <Text medium type="h1">Tipo de pet:</Text>
          <PetTypeFilter petType={petType} setPetType={setPetType} />

          <SearchBarView
            value={search}
            onChangeText={setSearch}
            placeholder="Pesquisar ONG"
            showSubmit
            autoFocus={false}
            onSubmit={searchOngs}
          />
          {loading ? (
            <Loading style={{ marginTop: 16 }} loading={loading} />
          ) : (
            ongs?.length > 0 ? (
              <OngTypeFilter
                ongs={ongs}
                ongFilterId={ongFilterId}
                setOngFilterId={setOngFilterId}
              />
            ) :
              <Text style={{ marginTop: 4, marginLeft: 4 }} medium type="h1">Pesquise por uma ONG para ver seus pets.</Text>
          )}
        </View>

        <PrimaryButton
          title="Filtrar"
          onPress={handleFilter}
        />
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  body: {
    flex: 1,
    gap: 8,
  },
});

export default BottomSheetPetFilter;