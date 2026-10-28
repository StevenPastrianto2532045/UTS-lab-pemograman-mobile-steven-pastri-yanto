import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, PRODI_COLORS, DEFAULT_PRODI_COLOR } from '../constants/theme';

// Dataset statis (di luar komponen utama)
const DAFTAR_MAHASISWA = [
  { id: '1', nama: 'Steven Pastri Yanto', prodi: 'Teknologi Informasi' },
  { id: '2', nama: 'Budi Santoso', prodi: 'Teknologi Informasi' },
  { id: '3', nama: 'Citra Dewi', prodi: 'Sistem Informasi' },
  { id: '4', nama: 'Dimas Anggara', prodi: 'Teknik Informatika' },
  { id: '5', nama: 'Eka Nur Safitri', prodi: 'Sistem Informasi' },
];

// `header` adalah konten di atas daftar (misalnya daftar tugas), dikirim dari App.js
export default function StudentDirectoryScreen({ header }) {
  const [keyword, setKeyword] = useState('');

  // Filter real-time, case-insensitive
  const keywordLower = keyword.toLowerCase();
  const filteredData = DAFTAR_MAHASISWA.filter((mahasiswa) =>
    mahasiswa.nama.toLowerCase().includes(keywordLower)
  );

  const renderItem = ({ item }) => {
    const initial = item.nama.charAt(0).toUpperCase();
    const prodiColor = PRODI_COLORS[item.prodi] ?? DEFAULT_PRODI_COLOR;

    return (
      <View style={styles.item}>
        <View style={[styles.avatar, { backgroundColor: prodiColor.bg }]}>
          <Text style={[styles.avatarText, { color: prodiColor.text }]}>{initial}</Text>
        </View>
        <View style={styles.itemTextWrap}>
          <Text style={styles.nama}>{item.nama}</Text>
          <View style={[styles.prodiChip, { backgroundColor: prodiColor.bg }]}>
            <Text style={[styles.prodiText, { color: prodiColor.text }]}>{item.prodi}</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
      </View>
    );
  };

  // Semua konten di atas daftar dijadikan ListHeaderComponent
  const listHeader = (
    <View>
      {header}

      <Text style={styles.sectionTitle}>Direktori Mahasiswa</Text>

      <View style={styles.searchWrap}>
        <Ionicons name="search" size={18} color={COLORS.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Cari nama mahasiswa..."
          placeholderTextColor={COLORS.textMuted}
          value={keyword}
          onChangeText={setKeyword}
          autoCorrect={false}
          autoCapitalize="none"
        />
        {keyword.length > 0 && (
          <TouchableOpacity onPress={() => setKeyword('')} hitSlop={10}>
            <Ionicons name="close-circle" size={18} color={COLORS.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.counter}>{filteredData.length} mahasiswa ditemukan</Text>
    </View>
  );

  return (
    <FlatList
      data={filteredData}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ListHeaderComponent={listHeader}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
      ListEmptyComponent={
        <View style={styles.emptyWrap}>
          <Ionicons name="search-outline" size={44} color={COLORS.border} />
          <Text style={styles.emptyText}>Data tidak ditemukan!</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textDark,
    marginTop: 8,
    marginBottom: 12,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 50,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: COLORS.textDark,
    paddingVertical: 0,
  },
  counter: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textMuted,
    marginBottom: 8,
    marginLeft: 4,
  },
  listContent: {
    paddingBottom: 40,
    flexGrow: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#0F172A',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 },
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '800',
  },
  itemTextWrap: {
    flex: 1,
  },
  nama: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 4,
  },
  prodiChip: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  prodiText: {
    fontSize: 11,
    fontWeight: '600',
  },
  emptyWrap: {
    alignItems: 'center',
    marginTop: 40,
    gap: 10,
  },
  emptyText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
});