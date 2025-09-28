# TanStack Query Integration

## Обзор

Интеграция TanStack Query (React Query) в Nimbus Control Panel обеспечивает эффективное управление состоянием сервера, кэширование данных и автоматическое обновление.

## Основные возможности

### 🔄 Автоматическое обновление
- **Периодическое обновление**: Данные обновляются каждые 30 секунд
- **Обновление в фоне**: Работает даже когда вкладка неактивна
- **Ревалидация при фокусе**: Обновление при возвращении к вкладке

### 💾 Умное кэширование
- **Stale Time**: 5 минут - данные считаются свежими
- **Garbage Collection**: 10 минут - время хранения в кэше
- **Оптимистичные обновления**: Мгновенное обновление UI

### 🔄 Управление состоянием
- **Автоматическая синхронизация**: Изменения отражаются во всех компонентах
- **Инвалидация кэша**: Автоматическая очистка при мутациях
- **Retry логика**: Автоматические повторы при ошибках

## Архитектура

### Query Keys
Структурированные ключи для организации кэша:

```javascript
// Агенты
agentKeys = {
  all: ['agents'],
  lists: () => [...agentKeys.all, 'list'],
  details: () => [...agentKeys.all, 'detail'],
  detail: (id) => [...agentKeys.details(), id],
}

// Правила
ruleKeys = {
  all: ['rules'],
  lists: () => [...ruleKeys.all, 'list'],
  details: () => [...ruleKeys.all, 'detail'],
  detail: (id) => [...ruleKeys.details(), id],
}
```

### Хуки для работы с данными

#### Агенты
```javascript
// Получение списка агентов
const { data: agents, isLoading, error } = useAgents();

// Создание агента
const createAgent = useCreateAgent();
createAgent.mutate(agentData);

// Обновление агента
const updateAgent = useUpdateAgent();
updateAgent.mutate({ id, data });

// Удаление агента
const deleteAgent = useDeleteAgent();
deleteAgent.mutate(id);
```

#### Правила
```javascript
// Получение списка правил
const { data: rules, isLoading } = useRules();

// Создание правила
const createRule = useCreateRule();
createRule.mutate(ruleData);
```

#### Маршруты
```javascript
// Получение списка маршрутов
const { data: routes, isLoading } = useRoutes();

// Создание маршрута
const createRoute = useCreateRoute();
createRoute.mutate(routeData);
```

#### GeoDNS
```javascript
// Получение GeoDNS конфигураций
const { data: geodns, isLoading } = useGeoDns();

// Создание GeoDNS конфигурации
const createGeoDns = useCreateGeoDns();
createGeoDns.mutate(geodnsData);
```

#### Пользователи
```javascript
// Получение списка пользователей
const { data: users, isLoading } = useUsers();

// Создание пользователя
const createUser = useCreateUser();
createUser.mutate(userData);
```

### Дашборд
```javascript
// Статистика дашборда
const { data: stats, isLoading } = useDashboardStats();

// Последняя активность
const { data: recentActivity } = useRecentActivity();
```

## Конфигурация

### QueryClient
```javascript
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 минут
      gcTime: 10 * 60 * 1000, // 10 минут
      retry: (failureCount, error) => {
        // Не повторять при 401/403 ошибках
        if (error?.status === 401 || error?.status === 403) {
          return false;
        }
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: false,
    },
  },
});
```

### Провайдер
```javascript
export function QueryProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

## Автоматическое обновление

### Интервалы обновления
- **Агенты**: 30 секунд
- **Правила**: 30 секунд
- **Маршруты**: 30 секунд
- **GeoDNS**: 30 секунд
- **Пользователи**: 60 секунд
- **Активность**: 10 секунд

### Условия обновления
- **refetchInterval**: Периодическое обновление
- **refetchIntervalInBackground**: Обновление в фоне
- **refetchOnWindowFocus**: Обновление при фокусе (отключено)
- **refetchOnReconnect**: Обновление при восстановлении соединения

## Обработка ошибок

### Retry логика
```javascript
retry: (failureCount, error) => {
  // Не повторять при ошибках аутентификации
  if (error?.status === 401 || error?.status === 403) {
    return false;
  }
  // Повторить до 3 раз для других ошибок
  return failureCount < 3;
}
```

### Обработка в компонентах
```javascript
const { data, isLoading, error } = useAgents();

if (error) {
  return <div>Error: {error.message}</div>;
}

if (isLoading) {
  return <div>Loading...</div>;
}
```

## Оптимизации

### Инвалидация кэша
```javascript
// После создания агента
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: agentKeys.lists() });
}

// После обновления агента
onSuccess: (data, variables) => {
  queryClient.setQueryData(agentKeys.detail(variables.id), data);
  queryClient.invalidateQueries({ queryKey: agentKeys.lists() });
}
```

### Оптимистичные обновления
```javascript
onMutate: async (newAgent) => {
  // Отменить исходящие запросы
  await queryClient.cancelQueries({ queryKey: agentKeys.lists() });
  
  // Сохранить предыдущие данные
  const previousAgents = queryClient.getQueryData(agentKeys.lists());
  
  // Оптимистично обновить кэш
  queryClient.setQueryData(agentKeys.lists(), old => [...old, newAgent]);
  
  return { previousAgents };
}
```

## DevTools

React Query DevTools включены в режиме разработки:
- Просмотр состояния кэша
- Мониторинг запросов
- Отладка мутаций
- Анализ производительности

## Преимущества

### Для пользователей
- **Мгновенные обновления**: Данные всегда актуальны
- **Офлайн поддержка**: Работа с кэшированными данными
- **Плавный UX**: Нет задержек при навигации

### Для разработчиков
- **Простота использования**: Декларативные хуки
- **Автоматическое управление**: Кэш, загрузка, ошибки
- **Отладка**: Встроенные DevTools
- **Производительность**: Оптимизированные запросы

## Мониторинг

### Метрики
- Время выполнения запросов
- Количество ошибок
- Эффективность кэша
- Частота обновлений

### Логирование
```javascript
onError: (error) => {
  console.error('API request failed:', error);
  // Отправка в систему мониторинга
}
```

## Будущие улучшения

1. **WebSocket интеграция**: Real-time обновления
2. **Офлайн поддержка**: Service Worker
3. **Предиктивное кэширование**: Предзагрузка данных
4. **Аналитика**: Детальная статистика использования
