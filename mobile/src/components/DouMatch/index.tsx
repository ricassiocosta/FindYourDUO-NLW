import { View, Modal, ModalProps, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons"
import * as Clipboard from "expo-clipboard"

import { styles } from './styles';
import { THEME } from '../../theme';
import { CheckCircle } from 'phosphor-react-native';
import { Heading } from '../Heading';
import { useState } from 'react';

interface Props extends ModalProps {
    discord: string
    onClose: () => void;
}

export function DouMatch({ discord, onClose, ...rest }: Props) {
    const [ isCoppying, setIsCoppying ] = useState(false)

    async function handleCopyDiscordToClipboard() {
        setIsCoppying(true)
        await Clipboard.setStringAsync(discord)

        Alert.alert("Discord copiado!", "Usuário copiado para você colocar no Discord e encontrar se DUO")
        setIsCoppying(false)
        
    }

    return (
        <Modal 
            animationType='fade'
            transparent
            statusBarTranslucent
            {...rest}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity
                        style={styles.closeBtn}
                        onPress={onClose}
                    >
                        <MaterialIcons 
                            name="close"
                            size={20}
                            color={THEME.COLORS.CAPTION_500}
                        />
                    </TouchableOpacity>

                    <CheckCircle 
                        size={64}
                        color={THEME.COLORS.SUCCESS}
                        weight="bold"
                    />

                    <Heading 
                        title="Let's play!" 
                        subtitle="Agora é só começar a jogar!"
                        style={{ alignItems: "center", marginTop: 24 }}
                    />

                    <Text style={styles.label}>
                        Adicione no Discord
                    </Text>

                    <TouchableOpacity
                        style={styles.discordBtn}
                        onPress={handleCopyDiscordToClipboard}
                        disabled={isCoppying}
                    >
                        <Text style={styles.discord}>
                            { isCoppying ? <ActivityIndicator/> : discord }
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}