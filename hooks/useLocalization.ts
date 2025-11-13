import { useState, useCallback } from 'react';

// To avoid issues with JSON module imports, translations are hardcoded here.
const en = {
  "appTitle": "Flow Timer",
  "start": "Start",
  "reset": "Reset",
  "seconds": "sec",
  "noTimersTitle": "No Timers",
  "noTimersSubtitle": "Add a timer strip to begin.",
  "timerNamePlaceholder": "Timer Name",
  "editTimerNameLabel": "Edit timer name",
  "removeTimerLabel": "Remove timer",
  "addRedTimer": "Add Red Timer",
  "addBlueTimer": "Add Blue Timer",
  "addGreenTimer": "Add Green Timer",
  "addYellowTimer": "Add Yellow Timer",
  "addPurpleTimer": "Add Purple Timer",
  "addPinkTimer": "Add Pink Timer",
  "langToggle": "中",
  "minutes": "min",
  "minutesLabel": "Timer minutes",
  "secondsLabel": "Timer seconds"
};

const zh = {
  "appTitle": "流水计时器",
  "start": "开始",
  "reset": "重置",
  "seconds": "秒",
  "noTimersTitle": "无计时器",
  "noTimersSubtitle": "添加一个计时条以开始。",
  "timerNamePlaceholder": "计时器名称",
  "editTimerNameLabel": "编辑计时器名称",
  "removeTimerLabel": "移除计时器",
  "addRedTimer": "添加红色计时器",
  "addBlueTimer": "添加蓝色计时器",
  "addGreenTimer": "添加绿色计时器",
  "addYellowTimer": "添加黄色计时器",
  "addPurpleTimer": "添加紫色计时器",
  "addPinkTimer": "添加粉色计时器",
  "langToggle": "EN",
  "minutes": "分",
  "minutesLabel": "计时器分钟",
  "secondsLabel": "计时器秒钟"
};

const translations = { en, zh };

type Language = 'en' | 'zh';
type TranslationKey = keyof typeof en;

export const useLocalization = () => {
  // Default to Chinese as requested
  const [language, setLanguage] = useState<Language>('zh');

  const toggleLanguage = useCallback(() => {
    setLanguage(lang => (lang === 'en' ? 'zh' : 'en'));
  }, []);

  const t = useCallback((key: string) => {
    const typedKey = key as TranslationKey;
    return translations[language][typedKey] || key;
  }, [language]);

  return { language, toggleLanguage, t };
};