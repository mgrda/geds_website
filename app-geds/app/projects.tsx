import { useRouter } from 'expo-router';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const COLORS = {
  primary: '#00DBFF',
  background: '#000000',
  surface: '#1A1A1A',
  text: '#FFFFFF',
  textSecondary: '#AAAAAA',
};

export default function ProjectsScreen() {
  const router = useRouter();

  const projects = [
    { id: '1', title: 'Website Institucional', status: 'Em progresso', progress: 0.7 },
    { id: '2', title: 'App Mobile GEDS', status: 'Iniciado', progress: 0.2 },
    { id: '3', title: 'API de Integração', status: 'Concluído', progress: 1.0 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meus Projetos</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {projects.map((project) => (
          <View key={project.id} style={styles.projectCard}>
            <View style={styles.projectInfo}>
              <Text style={styles.projectTitle}>{project.title}</Text>
              <Text style={styles.projectStatus}>{project.status}</Text>
            </View>
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, { width: `${project.progress * 100}%` }]} />
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Novo Projeto</Text>
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
  projectCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  projectInfo: {
    marginBottom: 16,
  },
  projectTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  projectStatus: {
    color: COLORS.primary,
    fontSize: 14,
  },
  progressContainer: {
    height: 6,
    backgroundColor: '#333',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  addButton: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
