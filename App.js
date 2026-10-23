import React from 'react';
import { View, Text, StyleSheet, Alert, StatusBar, Platform } from 'react-native';
import InfoCard from './src/components/InfoCard';
import StudentDirectoryScreen from './src/screens/StudentDirectoryScreen';
import { COLORS } from './src/constants/theme';

// Tinggi status bar (jam, baterai) agar header tidak tertutup
const TOP_INSET = Platform.OS === 'android' ? StatusBar.currentHeight ?? 24 : 44;

export default function App() {
  // Bagian daftar tugas, dikirim sebagai header ke list mahasiswa
  const tugasSection = (
    <View>
      <Text style={styles.sectionTitle}>Daftar Tugas</Text>
      <InfoCard
        title="Membuat laporan praktikum"
        status="selesai"
        onPress={() => Alert.alert('Detail', 'Laporan praktikum sudah selesai.')}
      />
      <InfoCard
        title="Mengerjakan UTS Mobile"
        status="proses"
        onPress={() => Alert.alert('Detail', 'UTS Mobile sedang dikerjakan.')}
      />
    </View>
  );

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      {/* Header tetap di atas (tidak ikut scroll) */}
      <View style={[styles.header, { paddingTop: TOP_INSET + 16 }]}>
        <Text style={styles.headerSubtitle}>Selamat datang 👋</Text>
        <Text style={styles.headerTitle}>Dashboard Mahasiswa</Text>
      </View>

      {/* Satu-satunya area scroll: FlatList di dalam StudentDirectoryScreen */}
      <View style={styles.body}>
        <StudentDirectoryScreen header={tugasSection} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingBottom: 28,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerSubtitle: {
    color: '#C7D2FE',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textDark,
    marginTop: 8,
    marginBottom: 12,
  },
});