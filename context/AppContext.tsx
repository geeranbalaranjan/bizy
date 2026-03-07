'use client'

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  type ReactNode,
  type Dispatch,
} from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import type {
  AppState,
  Auth0User,
  BusinessProfile,
  ViabilityResult,
  ChatMessage,
} from '@/types'

// ─── Actions ─────────────────────────────────────────────────────────────────

type AppAction =
  | { type: 'SET_USER'; payload: Auth0User | null }
  | { type: 'SET_BUSINESS_PROFILE'; payload: BusinessProfile | null }
  | { type: 'SET_VIABILITY_RESULT'; payload: ViabilityResult | null }
  | { type: 'SET_ROADMAP_PROGRESS'; payload: Record<string, boolean> }
  | { type: 'TOGGLE_ROADMAP_STEP'; payload: { stepId: string; isComplete: boolean } }
  | { type: 'SET_CHAT_HISTORY'; payload: ChatMessage[] }
  | { type: 'ADD_CHAT_MESSAGE'; payload: ChatMessage }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'RESET' }

// ─── Initial State ───────────────────────────────────────────────────────────

const initialState: AppState = {
  user: null,
  businessProfile: null,
  viabilityResult: null,
  roadmapProgress: {},
  chatHistory: [],
  isLoading: false,
}

// ─── Reducer ─────────────────────────────────────────────────────────────────

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload }

    case 'SET_BUSINESS_PROFILE':
      return { ...state, businessProfile: action.payload }

    case 'SET_VIABILITY_RESULT':
      return { ...state, viabilityResult: action.payload }

    case 'SET_ROADMAP_PROGRESS':
      return { ...state, roadmapProgress: action.payload }

    case 'TOGGLE_ROADMAP_STEP':
      return {
        ...state,
        roadmapProgress: {
          ...state.roadmapProgress,
          [action.payload.stepId]: action.payload.isComplete,
        },
      }

    case 'SET_CHAT_HISTORY':
      return { ...state, chatHistory: action.payload }

    case 'ADD_CHAT_MESSAGE':
      return { ...state, chatHistory: [...state.chatHistory, action.payload] }

    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }

    case 'RESET':
      return initialState

    default:
      return state
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────

interface AppContextValue {
  state: AppState
  dispatch: Dispatch<AppAction>
  setBusinessProfile: (profile: BusinessProfile) => void
  setViabilityResult: (result: ViabilityResult) => void
  toggleRoadmapStep: (stepId: string, isComplete: boolean) => void
  addChatMessage: (message: ChatMessage) => void
  setLoading: (loading: boolean) => void
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

// ─── Provider ────────────────────────────────────────────────────────────────

export function AppProvider({ children }: { children: ReactNode }) {
  const { user: auth0User, isLoading: authLoading } = useUser()
  const [state, dispatch] = useReducer(appReducer, {
    ...initialState,
    user: auth0User
      ? {
          sub: auth0User.sub ?? '',
          name: auth0User.name ?? '',
          email: auth0User.email ?? '',
          picture: auth0User.picture ?? '',
          email_verified: auth0User.email_verified ?? false,
        }
      : null,
    isLoading: authLoading,
  })

  const setBusinessProfile = useCallback(
    (profile: BusinessProfile) =>
      dispatch({ type: 'SET_BUSINESS_PROFILE', payload: profile }),
    []
  )

  const setViabilityResult = useCallback(
    (result: ViabilityResult) =>
      dispatch({ type: 'SET_VIABILITY_RESULT', payload: result }),
    []
  )

  const toggleRoadmapStep = useCallback(
    (stepId: string, isComplete: boolean) =>
      dispatch({ type: 'TOGGLE_ROADMAP_STEP', payload: { stepId, isComplete } }),
    []
  )

  const addChatMessage = useCallback(
    (message: ChatMessage) =>
      dispatch({ type: 'ADD_CHAT_MESSAGE', payload: message }),
    []
  )

  const setLoading = useCallback(
    (loading: boolean) => dispatch({ type: 'SET_LOADING', payload: loading }),
    []
  )

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        setBusinessProfile,
        setViabilityResult,
        toggleRoadmapStep,
        addChatMessage,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
