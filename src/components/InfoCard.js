import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

const STATUS_CONFIG = {
  selesai: {
    label: 'Selesai',
    icon: 'checkmark-circle',
    accent: COLORS.success,
    badgeBg: COLORS.successBg,
    badgeText: COLORS.successText,
  },
  proses: {
    label: 'Proses',
    icon: 'time',
    accent: COLORS.warning,
    badgeBg: COLORS.warningBg,
    badgeText: COLORS.warningText,
  },
};

const DEFAULT_STATUS = {
  label: '-',
  icon: 'ellipse',
  accent: COLORS.textMuted,
  badgeBg: COLORS.border,
  badgeText: COLORS.textMuted,
};

export default function InfoCard({ title, status, onPress }) {
  const config = STATUS_CONFIG[status] ?? DEFAULT_STATUS;

  return (
    <View style={[styles.card, { borderLeftColor: config.accent }]}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <View style={[styles.badge, { backgroundColor: config.badgeBg }]}>
          <Ionicons name={config.icon} size={13} color={config.badgeText} />
          <Text style={[styles.badgeText, { color: config.badgeText }]}>
            {config.label}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Lihat Detail</Text>
        <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#0F172A',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
    marginRight: 10,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.primary,
    paddingVertical: 11,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
});