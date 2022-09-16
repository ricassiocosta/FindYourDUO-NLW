import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../../components/Background';
import { useRoute, useNavigation } from "@react-navigation/native"
import { GameParams } from '../../@types/navigation';
import { TouchableOpacity, View, Image, FlatList, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react';

import { styles } from './styles';
import { THEME } from '../../theme';
import logoImg from "../../assets/logo-nlw-esports.png"
import { Heading } from '../../components/Heading';
import { DouCard, DouCardProps } from '../../components/DouCard';
import { DouMatch } from '../../components/DouMatch';

export function Game() {
  const navigation = useNavigation()
  const route = useRoute()
  const game = route.params as GameParams
  const [ ads, setAds ] = useState<DouCardProps[]>([])
  const [ isDuoSelected, setIsDuoSelected ] = useState<boolean>(false)
  const [ selectedDuoDiscord, setSelectedDuoDiscord ] = useState("")

  function handleGoBack() {
    navigation.goBack()
  }

  async function getDiscordUser(adsId: string) {
    fetch(`http://192.168.15.11:3333/ads/${adsId}/discord`)
      .then(response => response.json())
      .then(data => setSelectedDuoDiscord(data.discord))
  }

  useEffect(() => {
    fetch(`http://192.168.15.11:3333/games/${game.id}/ads`)
      .then(response => response.json())
      .then(ads => setAds(ads))
  })

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo 
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image
            source={logoImg}
            style={styles.logo}
          />
          <View style={styles.right}/>
        </View>

        <Image
          source={{uri: game.bannerUrl}}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading 
          title={game.title}
          subtitle="Conecte-se e comece a jogar!"
        />

        <FlatList 
          data={ads}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <DouCard 
              data={item}
              onConnect={() => getDiscordUser(item.id)}
              onSelect={() => setIsDuoSelected(true)}
            />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={
              ads.length > 0 ? styles.contentList : { flex: 1, alignItems: "center", justifyContent: "center" }
          }
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda.
            </Text>
          )}
        />

        <DouMatch 
          visible={isDuoSelected}
          discord={selectedDuoDiscord}
          onClose={() => setIsDuoSelected(false)}
        />

      </SafeAreaView>
    </Background>
  );
}