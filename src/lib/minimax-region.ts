import { Language } from './i18n'

export interface MiniMaxRegion {
  id: 'cn' | '海外'
  name: string
  nameEn: string
  platformUrl: string
  baseUrl: string
  defaultModel: string
}

export const miniMaxRegions: Record<Language, MiniMaxRegion> = {
  zh: {
    id: 'cn',
    name: '中国区',
    nameEn: 'China',
    platformUrl: 'https://platform.minimaxi.com/user-center/basic-information',
    baseUrl: 'https://api.minimax.io/anthropic',
    defaultModel: 'minimax/MiniMax-M2.5',
  },
  en: {
    id: '海外',
    name: '海外区',
    nameEn: 'Global',
    platformUrl: 'https://platform.minimax.io/en-US/user-center/basic-information',
    baseUrl: 'https://api.minimax.io/v1',
    defaultModel: 'MiniMax-M2.5',
  },
}

export function getMiniMaxRegion(language: Language): MiniMaxRegion {
  return miniMaxRegions[language]
}
