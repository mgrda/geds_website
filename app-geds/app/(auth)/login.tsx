import { useRouter } from 'expo-router';
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const COLORS = {
  primary: '#00DBFF',
  background: '#000000',
  surface: '#1A1A1A',
  text: '#FFFFFF',
  textSecondary: '#AAAAAA',
};

export default function LoginScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>G</Text>
          </View>
          <Text style={styles.brandName}>GEDS <Text style={{fontWeight: '300'}}>Mobile</Text></Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.welcomeText}>Bem-vindo de volta</Text>
          <Text style={styles.subtitle}>Acesse sua conta para continuar</Text>
          
          <View style={styles.inputPlaceholder}>
            <Text style={styles.inputText}>E-mail ou Usuário</Text>
          </View>

          <View style={styles.inputPlaceholder}>
            <Text style={styles.inputText}>Senha</Text>
          </View>

          <TouchableOpacity 
            style={styles.button} 
            onPress={() => router.replace('/')}
          >
            <Text style={styles.buttonText}>ENTRAR NO SISTEMA</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.forgotPass}>
            <Text style={styles.forgotText}>Esqueceu sua senha?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Não tem uma conta? <Text style={{color: COLORS.primary}}>Cadastre-se</Text></Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 40,
    fontWeight: '900',
    color: COLORS.background,
  },
  brandName: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  form: {
    width: '100%',
  },
  welcomeText: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 16,
    marginBottom: 32,
  },
  inputPlaceholder: {
    backgroundColor: COLORS.surface,
    padding: 18,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  inputText: {
    color: '#666',
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: COLORS.background,
    fontWeight: '900',
    fontSize: 16,
    letterSpacing: 1,
  },
  forgotPass: {
    alignItems: 'center',
    marginTop: 20,
  },
  forgotText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  footerText: {
    color: COLORS.textSecondary,
  }
});
