export interface AppModule {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  color: string;
  route: string;
  isAvailable: boolean;
}

// Liste des modules disponibles dans l'application
export const APP_MODULES: AppModule[] = [
  {
    id: 'todos',
    title: 'To Do',
    subtitle: 'to do list',
    icon: 'check_circle',
    color: 'tile-purple',
    route: '/todo',
    isAvailable: false,
  },
  {
    id: 'planning',
    title: 'planning',
    subtitle: 'planning de la semaine',
    icon: 'calendar_today',
    color: 'tile-pink',
    route: '/planning',
    isAvailable: false,
  },
  {
    id: 'courses',
    title: 'Cours',
    subtitle: 'Gérez vos cours quotidiens',
    icon: 'shopping_cart',
    color: 'tile-mint',
    route: '/courses',
    isAvailable: false,
  },
  {
    id: 'depenses',
    title: 'Dépenses',
    subtitle: 'Gérez vos dépenses du mois',
    icon: 'account_balance_wallet',
    color: 'tile-orange',
    route: '/depenses',
    isAvailable: false,
  },
  {
    id: 'recettes',
    title: 'Recettes',
    subtitle: 'Gérez vos recettes du mois',
    icon: 'account_balance_wallet',
    color: 'tile-green',
    route: '/recettes',
    isAvailable: false,
  },
  {
    id: 'tracker',
    title: 'Tracker',
    subtitle: 'Suivez vos activités quotidiennes',
    icon: 'bar_chart',
    color: 'tile-lilac',
    route: '/tracker',
    isAvailable: false,
  },
  {
    id: 'gestionnaireMDP',
    title: 'Gestionnaire de MDP',
    subtitle: 'Gérez vos mots de passe',
    icon: 'lock',
    color: 'tile-blue',
    route: '/gestionnaire-mdp',
    isAvailable: false,
  },
  {
    id: 'ecommerce',
    title: 'E-commerce',
    subtitle: 'Gérez votre boutique en ligne',
    icon: 'shopping_cart',
    color: 'tile-orange',
    route: '/ecommerce',
    isAvailable: false,
  },
];