import { create } from 'zustand';
import { Tense, Voice } from '@/sarf/data/types';

interface DrillState {
  currentSlotIndex: number;
  currentPass: number;
  totalPasses: number;
  tense: Tense;
  voice: Voice;
  totalDrills: number;
  currentStreak: number;
  setTense: (t: Tense) => void;
  setVoice: (v: Voice) => void;
  nextSlot: (totalSlots: number) => void;
  resetDrill: () => void;
  incrementDrills: () => void;
}

export const useDrillStore = create<DrillState>((set) => ({
  currentSlotIndex: 0,
  currentPass: 1,
  totalPasses: 3,
  tense: 'madi',
  voice: 'active',
  totalDrills: 0,
  currentStreak: 0,
  setTense: (tense) => set({ tense, currentSlotIndex: 0, currentPass: 1 }),
  setVoice: (voice) => set({ voice, currentSlotIndex: 0, currentPass: 1 }),
  nextSlot: (totalSlots) =>
    set((state) => {
      const nextIndex = state.currentSlotIndex + 1;
      if (nextIndex >= totalSlots) {
        if (state.currentPass >= state.totalPasses) return { currentSlotIndex: totalSlots };
        return { currentSlotIndex: 0, currentPass: state.currentPass + 1 };
      }
      return { currentSlotIndex: nextIndex };
    }),
  resetDrill: () => set({ currentSlotIndex: 0, currentPass: 1 }),
  incrementDrills: () => set((s) => ({ totalDrills: s.totalDrills + 1, currentStreak: s.currentStreak + 1 })),
}));
