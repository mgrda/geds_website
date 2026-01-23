import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { 
  interpolate, 
  useAnimatedStyle, 
  useSharedValue, 
  withDelay, 
  withRepeat, 
  withSequence, 
  withSpring, 
  withTiming,
  Easing
} from 'react-native-reanimated';
import { Image } from 'expo-image';

const { width } = Dimensions.get('window');

// Design System inspired by the Frontend
const COLORS = {
  background: '#000000',
  cyan: '#00DBFF',
  cyanGlow: 'rgba(0, 219, 255, 0.3)',
  surface: '#121212',
  surfaceHighlight: '#1E1E1E',
  text: '#FFFFFF',
  textSecondary: '#A0A0A0',
  border: 'rgba(255, 255, 255, 0.1)',
};

export default function HomeScreen() {
  const router = useRouter();
  const [showContent, setShowContent] = useState(false);

  // Animation Values
  const logoScale = useSharedValue(0.8);
  const logoOpacity = useSharedValue(0);
  const introOpacity = useSharedValue(1);
  const contentOpacity = useSharedValue(0);
  const glowIntensity = useSharedValue(0);

  useEffect(() => {
    // 1. Intro Animation Sequence
    logoOpacity.value = withTiming(1, { duration: 1000 });
    logoScale.value = withSpring(1, { damping: 12 });
    
    // Pulse effect
    glowIntensity.value = withRepeat(
      withSequence(
        withTiming(0.8, { duration: 1000 }),
        withTiming(0.4, { duration: 1000 })
      ),
      2, // run twice
      true // reverse
    );

    // 2. Transition to App
    setTimeout(() => {
      introOpacity.value = withTiming(0, { duration: 800 }, () => {
        // scale up to "open" the app
      });
      logoScale.value = withTiming(5, { duration: 800, easing: Easing.exp }); // Zoom in effect
      
      setTimeout(() => {
        setShowContent(true);
        contentOpacity.value = withTiming(1, { duration: 800 });
      }, 400);
    }, 2500);
  }, []);

  const introStyle = useAnimatedStyle(() => ({
    opacity: introOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowIntensity.value,
    transform: [{ scale: interpolate(glowIntensity.value, [0, 1], [1, 1.2]) }],
  }));

  const containerStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    transform: [{ translateY: interpolate(contentOpacity.value, [0, 1], [50, 0]) }]
  }));

  // Render the Intro
  if (!showContent) {
    return (
      <View style={styles.introContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        
        {/* Glow Effect Background */}
        <Animated.View style={[styles.glowBackground, glowStyle]} />

        <Animated.View style={[styles.logoContainer, introStyle]}>
          <Image 
            source={require('../assets/geds-logo.png')} 
            style={styles.logo}
            contentFit="contain"
          />
        </Animated.View>
        
        <Animated.Text style={[styles.introText, { opacity: logoOpacity }]}>
          GEDS INOVAÇÃO
        </Animated.Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      <Animated.View style={[styles.mainContent, containerStyle]}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.headerSubtitle}>Bem-vindo de volta</Text>
              <Text style={styles.headerTitle}>
                Dashboard <Text style={styles.textHighlight}>Pro</Text>
              </Text>
            </View>
            <View style={styles.avatar}>
               <Text style={styles.avatarText}>DV</Text>
            </View>
          </View>

          {/* Hero Card */}
          <View style={styles.heroCard}>
            <View style={styles.heroGlow} />
            <Text style={styles.heroTitle}>Engenharia de Software</Text>
            <Text style={styles.heroSubtitle}>& Soluções Digitais</Text>
            <View style={styles.heroDivider} />
            <Text style={styles.heroDesc}>
              Gerencie seus projetos e ecossistemas digitais com alta performance.
            </Text>
            
            <TouchableOpacity style={styles.heroButton} activeOpacity={0.8}>
              <Text style={styles.heroButtonText}>Novo Projeto</Text>
            </TouchableOpacity>
          </View>

          {/* Stats Grid */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Projetos Ativos</Text>
              <View style={styles.statIndicator} />
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>98%</Text>
              <Text style={styles.statLabel}>Uptime Server</Text>
              <View style={[styles.statIndicator, { backgroundColor: '#00FF94' }]} />
            </View>
          </View>

          {/* Menu Grid */}
          <Text style={styles.sectionTitle}>Acesso Rápido</Text>
          <View style={styles.menuGrid}>
            <MenuCard 
              title="Meus Projetos" 
              icon="folder" 
              onPress={() => router.push('/projects')} 
            />
            <MenuCard 
              title="Configurações" 
              icon="settings" 
              onPress={() => router.push('/settings')} 
            />
            <MenuCard 
              title="Análises" 
              icon="bar-chart" 
              onPress={() => {}} 
            />
            <MenuCard 
              title="Sair" 
              icon="log-out" 
              isDanger 
              onPress={() => router.replace('/(auth)/login')} 
            />
          </View>

        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}

// Small Component for Grid Items
function MenuCard({ title, icon, onPress, isDanger = false }: { title: string, icon: string, onPress: () => void, isDanger?: boolean }) {
  return (
    <TouchableOpacity 
      style={[styles.menuCard, isDanger && styles.menuCardDanger]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconPlaceholder, isDanger && { backgroundColor: 'rgba(255, 75, 75, 0.1)' }]}>
        {/* Placeholder for Icon (using Text for now to avoid icon lib dependency loops) */}
        <Text style={[styles.iconText, isDanger && { color: '#FF4B4B' }]}>{icon === 'folder' ? '📂' : icon === 'settings' ? '⚙️' : icon === 'bar-chart' ? '📊' : '🚪'}</Text>
      </View>
      <Text style={[styles.menuTitle, isDanger && { color: '#FF4B4B' }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Intro Styles
  introContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  glowBackground: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: COLORS.cyanGlow,
    filter: 'blur(40px)', // Note: standard Image doesn't support blur easily on native without specific libs, but this is a View
    // On native, opacity handles the "glow" look somewhat.
  },
  logoContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  introText: {
    color: COLORS.cyan,
    marginTop: 20,
    fontSize: 16,
    letterSpacing: 4,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },

  // App Styles
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  mainContent: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 10,
  },
  headerSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginBottom: 4,
  },
  headerTitle: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: 'bold',
  },
  textHighlight: {
    color: COLORS.cyan,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.surfaceHighlight,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: COLORS.cyan,
    fontWeight: 'bold',
    fontSize: 18,
  },
  
  // Hero
  heroCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 24,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: COLORS.cyanGlow,
    position: 'relative',
    overflow: 'hidden',
  },
  heroGlow: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: COLORS.cyanGlow,
    opacity: 0.5,
  },
  heroTitle: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: '900',
    lineHeight: 30,
  },
  heroSubtitle: {
    color: COLORS.cyan,
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 16,
  },
  heroDivider: {
    height: 2,
    width: 40,
    backgroundColor: COLORS.cyan,
    marginBottom: 16,
  },
  heroDesc: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 24,
  },
  heroButton: {
    backgroundColor: COLORS.cyan,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignSelf: 'flex-start',
    shadowColor: COLORS.cyan,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  heroButtonText: {
    color: COLORS.background,
    fontWeight: 'bold',
    fontSize: 16,
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.surfaceHighlight,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statValue: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  statIndicator: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.cyan,
  },

  // Menu Grid
  sectionTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  menuCard: {
    width: (width - 48 - 16) / 2, // 2 items per row, accounting for padding and gap
    backgroundColor: COLORS.surface,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    aspectRatio: 1,
  },
  menuCardDanger: {
    borderColor: 'rgba(255, 75, 75, 0.3)',
    backgroundColor: 'rgba(255, 75, 75, 0.05)',
  },
  iconPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 219, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconText: {
    fontSize: 24,
  },
  menuTitle: {
    color: COLORS.text,
    fontWeight: '600',
    fontSize: 14,
  },
});
