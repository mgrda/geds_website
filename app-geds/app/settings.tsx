import { useRouter } from 'expo-router';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

const COLORS = {
  primary: '#00DBFF',
  background: '#000000',
  surface: '#1A1A1A',
  text: '#FFFFFF',
  textSecondary: '#AAAAAA',
};

export default function SettingsScreen() {
  const router = useRouter();

  const settingsOptions = [
    { title: 'Perfil', desc: 'Editar suas informações pessoais' },
    { title: 'Notificações', desc: 'Gerenciar alertas do sistema', isSwitch: true },
    { title: 'Segurança', desc: 'Alterar senha e autenticação' },
    { title: 'Tema Escuro', desc: 'Ativar visual noturno', isSwitch: true, value: true },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Configurações</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.userSection}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>AD</Text>
          </View>
          <Text style={styles.userName}>Admin GEDS</Text>
          <Text style={styles.userEmail}>admin@geds.com.br</Text>
        </View>

        <View style={styles.optionsSection}>
          {settingsOptions.map((option, index) => (
            <View key={index} style={styles.optionItem}>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionDesc}>{option.desc}</Text>
              </View>
              {option.isSwitch ? (
                <Switch 
                  value={option.value} 
                  trackColor={{ false: '#333', true: COLORS.primary }}
                  thumbColor={COLORS.text}
                />
              ) : (
                <Text style={styles.optionArrow}>›</Text>
              )}
            </View>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => router.replace('/(auth)/login')}
        >
          <Text style={styles.deleteButtonText}>Remover Conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  backIcon: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: 20,
  },
  userSection: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#333',
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.background,
  },
  userName: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  userEmail: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  optionsSection: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#252525',
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
  },
  optionDesc: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  optionArrow: {
    color: COLORS.textSecondary,
    fontSize: 24,
    marginLeft: 10,
  },
  deleteButton: {
    marginTop: 40,
    padding: 20,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FF4B4B',
    fontWeight: 'bold',
  },
});
