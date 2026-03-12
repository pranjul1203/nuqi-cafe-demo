import { useState } from 'react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

interface ReservationForm {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: string;
  requests: string;
  tableType: string;
}

interface OrderForm {
  name: string;
  phone: string;
  deliveryType: 'delivery' | 'pickup';
  address: string;
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'cafe' | 'cocktail'>('cafe');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');

  const [reservationForm, setReservationForm] = useState<ReservationForm>({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    guests: '',
    requests: '',
    tableType: ''
  });

  const [orderForm, setOrderForm] = useState<OrderForm>({
    name: '',
    phone: '',
    deliveryType: 'pickup',
    address: ''
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const tableTypes = [
    {
      id: 'table-2',
      name: 'Table for 2',
      icon: '👥',
      description: 'Intimate seating for couples',
      capacity: '2 people'
    },
    {
      id: 'table-3',
      name: 'Table for 3',
      icon: '👨‍👩‍👦',
      description: 'Perfect for small groups',
      capacity: '3 people'
    },
    {
      id: 'family-table',
      name: 'Family Table',
      icon: '👨‍👩‍👧‍👦',
      description: 'Spacious seating for families',
      capacity: '4-6 people'
    },
    {
      id: 'premium-lounge',
      name: 'Premium Lounge Table',
      icon: '✨',
      description: 'Exclusive VIP experience',
      capacity: 'Up to 6 people'
    }
  ];

  const orderMenuItems = {
    Coffee: [
      { id: 'coffee-1', name: 'Espresso', price: 3.50, description: 'Rich and bold', image: 'https://images.unsplash.com/photo-1630040995437-80b01c5dd52d?w=400' },
      { id: 'coffee-2', name: 'Cappuccino', price: 4.50, description: 'Creamy and smooth', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400' },
      { id: 'coffee-3', name: 'Latte', price: 4.75, description: 'Velvety milk coffee', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400' },
    ],
    Pizza: [
      { id: 'pizza-1', name: 'Margherita', price: 12.99, description: 'Classic tomato & mozzarella', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400' },
      { id: 'pizza-2', name: 'Pepperoni', price: 14.99, description: 'Spicy pepperoni slices', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400' },
      { id: 'pizza-3', name: 'Vegetarian', price: 13.99, description: 'Fresh garden vegetables', image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96a47?w=400' },
    ],
    Pasta: [
      { id: 'pasta-1', name: 'Carbonara', price: 15.99, description: 'Creamy bacon pasta', image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400' },
      { id: 'pasta-2', name: 'Bolognese', price: 14.99, description: 'Rich meat sauce', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400' },
      { id: 'pasta-3', name: 'Pesto', price: 13.99, description: 'Fresh basil pesto', image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400' },
    ],
    'Signature Cocktails': [
      { id: 'cocktail-1', name: 'Midnight Manhattan', price: 16.00, description: 'Premium bourbon blend', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400' },
      { id: 'cocktail-2', name: 'Golden Margarita', price: 14.00, description: 'Aged tequila perfection', image: 'https://images.unsplash.com/photo-1561387940-ab7689844a86?w=400' },
      { id: 'cocktail-3', name: 'Velvet Martini', price: 15.00, description: 'Smooth and sophisticated', image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400' },
    ],
    Desserts: [
      { id: 'dessert-1', name: 'Chocolate Cake', price: 5.50, description: 'Rich triple layer', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400' },
      { id: 'dessert-2', name: 'Tiramisu', price: 6.25, description: 'Classic Italian delight', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400' },
      { id: 'dessert-3', name: 'Cheesecake', price: 5.75, description: 'Creamy NY style', image: 'https://images.unsplash.com/photo-1533134242820-b8e0eb0b8e07?w=400' },
    ],
  };

  const addToCart = (item: { id: string; name: string; price: number }, category: string) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1, category }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const handleTableSelect = (tableType: string) => {
    setSelectedTable(tableType);
    setReservationForm({ ...reservationForm, tableType });
    setIsReservationModalOpen(true);
  };

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Reservation confirmed!\nTable: ${reservationForm.tableType}\nName: ${reservationForm.name}\nDate: ${reservationForm.date} at ${reservationForm.time}\nGuests: ${reservationForm.guests}`);
    setIsReservationModalOpen(false);
    setReservationForm({
      name: '',
      phone: '',
      email: '',
      date: '',
      time: '',
      guests: '',
      requests: '',
      tableType: ''
    });
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Order placed!\nName: ${orderForm.name}\nType: ${orderForm.deliveryType}\nTotal: $${cartTotal.toFixed(2)}\nItems: ${cartCount}`);
    setIsCheckoutModalOpen(false);
    setCartItems([]);
    setOrderForm({
      name: '',
      phone: '',
      deliveryType: 'pickup',
      address: ''
    });
  };

  const cafeMenuItems = [
    {
      category: 'Coffee',
      items: [
        { name: 'Espresso', price: '$3.50', description: 'Rich and bold single shot' },
        { name: 'Cappuccino', price: '$4.50', description: 'Espresso with steamed milk and foam' },
        { name: 'Latte', price: '$4.75', description: 'Smooth espresso with steamed milk' },
        { name: 'Americano', price: '$3.75', description: 'Espresso with hot water' },
        { name: 'Mocha', price: '$5.00', description: 'Espresso with chocolate and steamed milk' },
        { name: 'Cold Brew', price: '$4.25', description: 'Smooth, refreshing cold coffee' },
      ]
    },
    {
      category: 'Pastries & Desserts',
      items: [
        { name: 'Croissant', price: '$3.50', description: 'Buttery, flaky French pastry' },
        { name: 'Chocolate Cake', price: '$5.50', description: 'Rich chocolate layer cake' },
        { name: 'Macarons', price: '$6.00', description: 'Assorted French macarons (6 pcs)' },
        { name: 'Muffin', price: '$3.75', description: 'Freshly baked daily' },
        { name: 'Cheesecake', price: '$5.75', description: 'Creamy New York style' },
        { name: 'Tiramisu', price: '$6.25', description: 'Classic Italian dessert' },
      ]
    },
    {
      category: 'Specialty Drinks',
      items: [
        { name: 'Matcha Latte', price: '$5.25', description: 'Premium Japanese green tea' },
        { name: 'Chai Latte', price: '$4.75', description: 'Spiced tea with steamed milk' },
        { name: 'Hot Chocolate', price: '$4.25', description: 'Rich Belgian chocolate' },
        { name: 'Iced Tea', price: '$3.50', description: 'Refreshing brewed tea' },
      ]
    }
  ];

  const cocktailMenuItems = [
    {
      category: 'Signature Cocktails',
      items: [
        { name: 'Midnight Manhattan', price: '$16', description: 'Premium bourbon, sweet vermouth, bitters' },
        { name: 'Golden Margarita', price: '$14', description: 'Aged tequila, Cointreau, fresh lime' },
        { name: 'Velvet Martini', price: '$15', description: 'Premium vodka, dry vermouth, olive' },
        { name: 'Royal Negroni', price: '$16', description: 'Gin, Campari, sweet vermouth' },
        { name: 'Dark & Stormy', price: '$13', description: 'Dark rum, ginger beer, lime' },
        { name: 'Espresso Martini', price: '$15', description: 'Vodka, coffee liqueur, fresh espresso' },
      ]
    },
    {
      category: 'Classic Cocktails',
      items: [
        { name: 'Old Fashioned', price: '$14', description: 'Bourbon, sugar, bitters, orange' },
        { name: 'Whiskey Sour', price: '$13', description: 'Bourbon, lemon, simple syrup, egg white' },
        { name: 'Moscow Mule', price: '$12', description: 'Vodka, ginger beer, lime' },
        { name: 'Mai Tai', price: '$14', description: 'Rum, Curaçao, orgeat, lime' },
        { name: 'Mojito', price: '$12', description: 'White rum, mint, lime, soda' },
        { name: 'Aperol Spritz', price: '$13', description: 'Aperol, prosecco, soda' },
      ]
    },
    {
      category: 'Premium Selection',
      items: [
        { name: 'Japanese Whisky Flight', price: '$45', description: 'Curated selection of three premium whiskies' },
        { name: 'Champagne Cocktail', price: '$18', description: 'Dom Pérignon, sugar cube, Angostura' },
        { name: 'Sazerac', price: '$17', description: 'Rye whiskey, absinthe, Peychaud\'s bitters' },
        { name: 'The Last Word', price: '$16', description: 'Gin, green Chartreuse, Maraschino, lime' },
      ]
    }
  ];

  const cafeGalleryImages = [
    {
      url: 'https://images.unsplash.com/photo-1751956066306-c5684cbcf385?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYWZlJTIwaW50ZXJpb3IlMjBjb2ZmZWUlMjBzaG9wfGVufDF8fHx8MTc3MzMwMzQ4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Cozy cafe interior'
    },
    {
      url: 'https://images.unsplash.com/photo-1630040995437-80b01c5dd52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBjdXAlMjBsYXR0ZSUyMGFydHxlbnwxfHx8fDE3NzMyNDcxNzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Latte art coffee'
    },
    {
      url: 'https://images.unsplash.com/photo-1771333253921-d5ff518c38e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxjYWZlJTIwZm9vZCUyMHBhc3RyaWVzJTIwZGVzc2VydHN8ZW58MXx8fHwxNzczMzAzNDg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Fresh pastries'
    },
    {
      url: 'https://images.unsplash.com/photo-1622868300874-0a1c2a9458fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxjb2ZmZWUlMjBjdXAlMjBsYXR0ZSUyMGFydHxlbnwxfHx8fDE3NzMyNDcxNzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Artisan coffee'
    },
    {
      url: 'https://images.unsplash.com/photo-1771333268849-9412054ce030?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxjYWZlJTIwZm9vZCUyMHBhc3RyaWVzJTIwZGVzc2VydHN8ZW58MXx8fHwxNzczMzAzNDg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Delicious desserts'
    },
    {
      url: 'https://images.unsplash.com/photo-1629909216781-12218b57d1a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxjb2ZmZWUlMjBjdXAlMjBsYXR0ZSUyMGFydHxlbnwxfHx8fDE3NzMyNDcxNzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Coffee being poured'
    },
  ];

  const cocktailGalleryImages = [
    {
      url: 'https://images.unsplash.com/photo-1767745455688-49391131f751?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjb2NrdGFpbCUyMGJhciUyMGRhcmslMjBtb29keXxlbnwxfHx8fDE3NzMzMDM5MTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Colorful cocktails'
    },
    {
      url: 'https://images.unsplash.com/photo-1610645603706-8227233d1f0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2NrdGFpbHMlMjBkcmlua3MlMjBiYXJ0ZW5kZXJ8ZW58MXx8fHwxNzczMzAzOTE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Bartender crafting cocktails'
    },
    {
      url: 'https://images.unsplash.com/photo-1767022724924-993b00fc04b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBjb2NrdGFpbCUyMGJhciUyMGRhcmslMjBtb29keXxlbnwxfHx8fDE3NzMzMDM5MTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Luxury bar interior'
    },
    {
      url: 'https://images.unsplash.com/photo-1736031334663-e7ee53d12781?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxjb2NrdGFpbHMlMjBkcmlua3MlMjBiYXJ0ZW5kZXJ8ZW58MXx8fHwxNzczMzAzOTE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Mixologist at work'
    },
    {
      url: 'https://images.unsplash.com/photo-1670819917515-0bf72062d670?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxjb2NrdGFpbHMlMjBkcmlua3MlMjBiYXJ0ZW5kZXJ8ZW58MXx8fHwxNzczMzAzOTE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Pouring cocktail'
    },
    {
      url: 'https://images.unsplash.com/photo-1547383674-1068bc5d506d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxjb2NrdGFpbHMlMjBkcmlua3MlMjBiYXJ0ZW5kZXJ8ZW58MXx8fHwxNzczMzAzOTE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Premium cocktails'
    },
  ];

  const isCafe = activeSection === 'cafe';
  const menuItems = isCafe ? cafeMenuItems : cocktailMenuItems;
  const galleryImages = isCafe ? cafeGalleryImages : cocktailGalleryImages;

  return (
    <div className={`min-h-screen ${isCafe ? 'bg-stone-50' : 'bg-zinc-950'}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 ${isCafe ? 'bg-white/95' : 'bg-black/95'} backdrop-blur-sm shadow-sm z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <span className={`text-2xl font-serif ${isCafe ? 'text-amber-900' : 'text-amber-400'}`}>
                Nuqi {isCafe ? 'Café' : 'Lounge'}
              </span>

              {/* Section Toggle */}
              <div className={`hidden sm:flex rounded-full p-1 ${isCafe ? 'bg-stone-200' : 'bg-zinc-800'}`}>
                <button
                  onClick={() => setActiveSection('cafe')}
                  className={`px-4 py-1.5 rounded-full transition-all ${
                    isCafe
                      ? 'bg-amber-700 text-white'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  Café
                </button>
                <button
                  onClick={() => setActiveSection('cocktail')}
                  className={`px-4 py-1.5 rounded-full transition-all ${
                    !isCafe
                      ? 'bg-amber-500 text-black'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Lounge
                </button>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6">
              <button
                onClick={() => scrollToSection('home')}
                className={`${isCafe ? 'text-stone-700 hover:text-amber-800' : 'text-zinc-300 hover:text-amber-400'} transition-colors`}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('menu')}
                className={`${isCafe ? 'text-stone-700 hover:text-amber-800' : 'text-zinc-300 hover:text-amber-400'} transition-colors`}
              >
                Menu
              </button>
              <button
                onClick={() => scrollToSection('reservations')}
                className={`${isCafe ? 'text-stone-700 hover:text-amber-800' : 'text-zinc-300 hover:text-amber-400'} transition-colors`}
              >
                Reservations
              </button>
              <button
                onClick={() => scrollToSection('order-online')}
                className={`${isCafe ? 'text-stone-700 hover:text-amber-800' : 'text-zinc-300 hover:text-amber-400'} transition-colors`}
              >
                Order Online
              </button>
              <button
                onClick={() => scrollToSection('gallery')}
                className={`${isCafe ? 'text-stone-700 hover:text-amber-800' : 'text-zinc-300 hover:text-amber-400'} transition-colors`}
              >
                Gallery
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 rounded-md ${isCafe ? 'text-stone-700 hover:bg-stone-100' : 'text-zinc-300 hover:bg-zinc-800'}`}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className={`md:hidden border-t ${isCafe ? 'border-stone-200 bg-white' : 'border-zinc-800 bg-black'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Section Toggle */}
              <div className={`flex rounded-full p-1 mb-2 ${isCafe ? 'bg-stone-200' : 'bg-zinc-800'}`}>
                <button
                  onClick={() => setActiveSection('cafe')}
                  className={`flex-1 px-4 py-1.5 rounded-full transition-all ${
                    isCafe
                      ? 'bg-amber-700 text-white'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  Café
                </button>
                <button
                  onClick={() => setActiveSection('cocktail')}
                  className={`flex-1 px-4 py-1.5 rounded-full transition-all ${
                    !isCafe
                      ? 'bg-amber-500 text-black'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Lounge
                </button>
              </div>

              <button
                onClick={() => scrollToSection('home')}
                className={`block w-full text-left px-3 py-2 ${isCafe ? 'text-stone-700 hover:bg-stone-100' : 'text-zinc-300 hover:bg-zinc-800'} rounded-md`}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('menu')}
                className={`block w-full text-left px-3 py-2 ${isCafe ? 'text-stone-700 hover:bg-stone-100' : 'text-zinc-300 hover:bg-zinc-800'} rounded-md`}
              >
                Menu
              </button>
              <button
                onClick={() => scrollToSection('reservations')}
                className={`block w-full text-left px-3 py-2 ${isCafe ? 'text-stone-700 hover:bg-stone-100' : 'text-zinc-300 hover:bg-zinc-800'} rounded-md`}
              >
                Reservations
              </button>
              <button
                onClick={() => scrollToSection('order-online')}
                className={`block w-full text-left px-3 py-2 ${isCafe ? 'text-stone-700 hover:bg-stone-100' : 'text-zinc-300 hover:bg-zinc-800'} rounded-md`}
              >
                Order Online
              </button>
              <button
                onClick={() => scrollToSection('gallery')}
                className={`block w-full text-left px-3 py-2 ${isCafe ? 'text-stone-700 hover:bg-stone-100' : 'text-zinc-300 hover:bg-zinc-800'} rounded-md`}
              >
                Gallery
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className={`block w-full text-left px-3 py-2 ${isCafe ? 'text-stone-700 hover:bg-stone-100' : 'text-zinc-300 hover:bg-zinc-800'} rounded-md`}
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center">
        <div className={`absolute inset-0 bg-gradient-to-br ${
          isCafe
            ? 'from-amber-900/90 to-stone-900/90'
            : 'from-black/70 via-purple-950/60 to-black/80'
        } z-10`} />
        <ImageWithFallback
          src={isCafe
            ? "https://images.unsplash.com/photo-1769987030173-8fd26b3fd254?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBjYWZlJTIwaW50ZXJpb3IlMjBjb2ZmZWUlMjBzaG9wfGVufDF8fHx8MTc3MzMwMzQ4N3ww&ixlib=rb-4.1.0&q=80&w=1080"
            : "https://images.unsplash.com/photo-1765766600172-11694c2cebd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBjb2NrdGFpbCUyMGJhciUyMGRhcmslMjBtb29keXxlbnwxfHx8fDE3NzMzMDM5MTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
          }
          alt={isCafe ? "Cafe interior" : "Luxury bar interior"}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center text-white px-4">
          <h1 className={`text-5xl md:text-7xl font-serif mb-4 ${isCafe ? '' : 'text-amber-400'}`}>
            {isCafe ? 'Welcome to Nuqi Café' : 'Nuqi Lounge'}
          </h1>
          <p className={`text-xl md:text-2xl mb-8 ${isCafe ? 'text-stone-200' : 'text-zinc-300'}`}>
            {isCafe ? 'Where every cup tells a story' : 'Crafted cocktails in luxury ambiance'}
          </p>
          <button
            onClick={() => scrollToSection('menu')}
            className={`${
              isCafe
                ? 'bg-amber-700 hover:bg-amber-800 text-white'
                : 'bg-amber-500 hover:bg-amber-600 text-black'
            } px-8 py-3 rounded-full transition-colors`}
          >
            {isCafe ? 'Explore Our Menu' : 'View Cocktail Menu'}
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 px-4 ${isCafe ? '' : 'bg-zinc-900'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-4xl font-serif mb-6 ${isCafe ? 'text-amber-900' : 'text-amber-400'}`}>
            {isCafe ? 'Our Story' : 'The Lounge Experience'}
          </h2>
          {isCafe ? (
            <>
              <p className={`text-lg mb-4 ${isCafe ? 'text-stone-700' : 'text-zinc-300'}`}>
                Founded in 2020, Nuqi Café has been serving the finest artisanal coffee and handcrafted pastries to our beloved community.
                Our passion for quality and commitment to sustainability drives everything we do.
              </p>
              <p className={`text-lg ${isCafe ? 'text-stone-700' : 'text-zinc-300'}`}>
                We source our beans directly from small farms around the world, ensuring every cup supports ethical farming practices
                and delivers exceptional flavor. Our skilled baristas craft each drink with care, creating moments of joy one cup at a time.
              </p>
            </>
          ) : (
            <>
              <p className="text-lg text-zinc-300 mb-4">
                Step into an evening of sophistication at Nuqi Lounge. Our master mixologists craft exceptional cocktails using premium spirits
                and house-made ingredients, creating liquid artistry that delights the senses.
              </p>
              <p className="text-lg text-zinc-300">
                In our intimate, luxuriously appointed space, discover rare spirits, innovative cocktails, and timeless classics.
                Every detail is curated to provide an unforgettable experience for the discerning palate.
              </p>
            </>
          )}
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className={`py-20 px-4 ${isCafe ? 'bg-white' : 'bg-black'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-4xl font-serif mb-12 text-center ${isCafe ? 'text-amber-900' : 'text-amber-400'}`}>
            {isCafe ? 'Our Menu' : 'Cocktail Menu'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems.map((category) => (
              <div
                key={category.category}
                className={`rounded-lg p-6 shadow-lg ${
                  isCafe
                    ? 'bg-stone-50 border border-stone-200'
                    : 'bg-zinc-900 border border-amber-500/20'
                }`}
              >
                <h3 className={`text-2xl font-serif mb-4 border-b pb-2 ${
                  isCafe
                    ? 'text-amber-800 border-amber-200'
                    : 'text-amber-400 border-amber-500/30'
                }`}>
                  {category.category}
                </h3>
                <div className="space-y-4">
                  {category.items.map((item) => (
                    <div key={item.name}>
                      <div className="flex justify-between items-baseline mb-1">
                        <span className={isCafe ? 'text-stone-800' : 'text-zinc-100'}>
                          {item.name}
                        </span>
                        <span className={isCafe ? 'text-amber-700' : 'text-amber-400'}>
                          {item.price}
                        </span>
                      </div>
                      <p className={`text-sm ${isCafe ? 'text-stone-600' : 'text-zinc-400'}`}>
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className={`py-20 px-4 ${isCafe ? '' : 'bg-zinc-900'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-4xl font-serif mb-12 text-center ${isCafe ? 'text-amber-900' : 'text-amber-400'}`}>
            Gallery
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className={`aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow ${
                  isCafe ? '' : 'ring-1 ring-amber-500/20'
                }`}
              >
                <ImageWithFallback
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Table Reservation Section */}
      <section id="reservations" className={`py-20 px-4 ${isCafe ? 'bg-stone-100' : 'bg-zinc-950'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-4xl font-serif mb-4 text-center ${isCafe ? 'text-amber-900' : 'text-amber-400'}`}>
            Reserve Your Table
          </h2>
          <p className={`text-center mb-12 ${isCafe ? 'text-stone-600' : 'text-zinc-400'}`}>
            Choose your perfect seating and book your experience
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tableTypes.map((table) => (
              <div
                key={table.id}
                onClick={() => handleTableSelect(table.name)}
                className={`group cursor-pointer rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                  isCafe
                    ? 'bg-white border-2 border-amber-200 hover:border-amber-500'
                    : 'bg-zinc-900 border-2 border-amber-500/30 hover:border-amber-500'
                }`}
              >
                <div className="text-center">
                  <div className="text-5xl mb-4">{table.icon}</div>
                  <h3 className={`text-xl font-serif mb-2 ${isCafe ? 'text-amber-900' : 'text-amber-400'}`}>
                    {table.name}
                  </h3>
                  <p className={`text-sm mb-2 ${isCafe ? 'text-stone-600' : 'text-zinc-400'}`}>
                    {table.description}
                  </p>
                  <p className={`text-xs ${isCafe ? 'text-stone-500' : 'text-zinc-500'}`}>
                    {table.capacity}
                  </p>
                  <button className={`mt-4 w-full py-2 rounded-lg transition-colors ${
                    isCafe
                      ? 'bg-amber-700 hover:bg-amber-800 text-white'
                      : 'bg-amber-500 hover:bg-amber-600 text-black'
                  }`}>
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Online Ordering Section */}
      <section id="order-online" className={`py-20 px-4 ${isCafe ? 'bg-white' : 'bg-black'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-4xl font-serif mb-4 text-center ${isCafe ? 'text-amber-900' : 'text-amber-400'}`}>
            Order Online
          </h2>
          <p className={`text-center mb-12 ${isCafe ? 'text-stone-600' : 'text-zinc-400'}`}>
            Browse our menu and enjoy delivery or pickup
          </p>

          {Object.entries(orderMenuItems).map(([category, items]) => (
            <div key={category} className="mb-12">
              <h3 className={`text-2xl font-serif mb-6 ${isCafe ? 'text-amber-800' : 'text-amber-400'}`}>
                {category}
              </h3>
              <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`group rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                      isCafe
                        ? 'bg-stone-50 border border-stone-200'
                        : 'bg-zinc-900 border border-amber-500/20'
                    }`}
                  >
                    <div className="aspect-video overflow-hidden">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className={`text-lg mb-1 ${isCafe ? 'text-stone-900' : 'text-zinc-100'}`}>
                        {item.name}
                      </h4>
                      <p className={`text-sm mb-3 ${isCafe ? 'text-stone-600' : 'text-zinc-400'}`}>
                        {item.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className={`text-xl ${isCafe ? 'text-amber-700' : 'text-amber-400'}`}>
                          ${item.price.toFixed(2)}
                        </span>
                        <button
                          onClick={() => addToCart(item, category)}
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            isCafe
                              ? 'bg-amber-700 hover:bg-amber-800 text-white'
                              : 'bg-amber-500 hover:bg-amber-600 text-black'
                          }`}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 px-4 ${isCafe ? 'bg-white' : 'bg-black'}`}>
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-4xl font-serif mb-12 text-center ${isCafe ? 'text-amber-900' : 'text-amber-400'}`}>
            Visit Us
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className={`text-2xl font-serif mb-4 ${isCafe ? 'text-amber-800' : 'text-amber-400'}`}>
                Location
              </h3>
              <p className={`mb-2 ${isCafe ? 'text-stone-700' : 'text-zinc-300'}`}>
                123 {isCafe ? 'Coffee' : 'Lounge'} Street
              </p>
              <p className={`mb-2 ${isCafe ? 'text-stone-700' : 'text-zinc-300'}`}>
                Downtown District
              </p>
              <p className={`mb-6 ${isCafe ? 'text-stone-700' : 'text-zinc-300'}`}>
                City, State 12345
              </p>

              <h3 className={`text-2xl font-serif mb-4 mt-8 ${isCafe ? 'text-amber-800' : 'text-amber-400'}`}>
                Hours
              </h3>
              <div className={`space-y-2 ${isCafe ? 'text-stone-700' : 'text-zinc-300'}`}>
                {isCafe ? (
                  <>
                    <p>Monday - Friday: 7:00 AM - 8:00 PM</p>
                    <p>Saturday - Sunday: 8:00 AM - 9:00 PM</p>
                  </>
                ) : (
                  <>
                    <p>Tuesday - Thursday: 5:00 PM - 1:00 AM</p>
                    <p>Friday - Saturday: 5:00 PM - 2:00 AM</p>
                    <p className="text-sm opacity-75">Closed Sunday & Monday</p>
                  </>
                )}
              </div>
            </div>

            <div>
              <h3 className={`text-2xl font-serif mb-4 ${isCafe ? 'text-amber-800' : 'text-amber-400'}`}>
                Contact
              </h3>
              <p className={`mb-2 ${isCafe ? 'text-stone-700' : 'text-zinc-300'}`}>
                Phone: (555) {isCafe ? '123-4567' : '987-6543'}
              </p>
              <p className={`mb-2 ${isCafe ? 'text-stone-700' : 'text-zinc-300'}`}>
                Email: {isCafe ? 'hello@nuqicafe.com' : 'reservations@nuqilounge.com'}
              </p>

              <h3 className={`text-2xl font-serif mb-4 mt-8 ${isCafe ? 'text-amber-800' : 'text-amber-400'}`}>
                Follow Us
              </h3>
              <div className="flex space-x-4">
                <a href="#" className={`${isCafe ? 'text-stone-700 hover:text-amber-800' : 'text-zinc-400 hover:text-amber-400'} transition-colors`}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className={`${isCafe ? 'text-stone-700 hover:text-amber-800' : 'text-zinc-400 hover:text-amber-400'} transition-colors`}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className={`${isCafe ? 'text-stone-700 hover:text-amber-800' : 'text-zinc-400 hover:text-amber-400'} transition-colors`}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${isCafe ? 'bg-amber-900' : 'bg-black border-t border-amber-500/20'} text-white py-8 px-4`}>
        <div className="max-w-6xl mx-auto text-center">
          <p className={`text-lg font-serif mb-2 ${isCafe ? '' : 'text-amber-400'}`}>
            Nuqi {isCafe ? 'Café' : 'Lounge'}
          </p>
          <p className={`text-sm mb-2 ${isCafe ? 'text-amber-200' : 'text-zinc-400'}`}>
            © 2026 Nuqi {isCafe ? 'Café' : 'Lounge'}. All rights reserved.
          </p>
          <p className={`text-sm ${isCafe ? 'text-amber-200' : 'text-zinc-400'}`}>
            {isCafe ? 'Crafted with love and premium beans' : 'Where luxury meets mixology'}
          </p>
        </div>
      </footer>

      {/* Floating Cart Button */}
      {cartCount > 0 && (
        <button
          onClick={() => setIsCartOpen(!isCartOpen)}
          className={`fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 z-40 ${
            isCafe ? 'bg-amber-700 hover:bg-amber-800' : 'bg-amber-500 hover:bg-amber-600'
          }`}
        >
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs ${
            isCafe ? 'bg-red-600 text-white' : 'bg-red-500 text-white'
          }`}>
            {cartCount}
          </span>
        </button>
      )}

      {/* Cart Panel */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-end">
          <div
            className={`w-full md:w-96 h-3/4 md:h-auto md:max-h-[80vh] rounded-t-2xl md:rounded-l-2xl md:rounded-r-none shadow-2xl flex flex-col ${
              isCafe ? 'bg-white' : 'bg-zinc-900'
            }`}
          >
            {/* Cart Header */}
            <div className={`p-4 border-b flex justify-between items-center ${
              isCafe ? 'border-stone-200' : 'border-zinc-700'
            }`}>
              <h3 className={`text-xl font-serif ${isCafe ? 'text-amber-900' : 'text-amber-400'}`}>
                Your Cart
              </h3>
              <button
                onClick={() => setIsCartOpen(false)}
                className={`p-2 rounded-lg ${isCafe ? 'hover:bg-stone-100' : 'hover:bg-zinc-800'}`}
              >
                <svg className={`w-6 h-6 ${isCafe ? 'text-stone-700' : 'text-zinc-300'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {cartItems.length === 0 ? (
                <p className={`text-center py-8 ${isCafe ? 'text-stone-600' : 'text-zinc-400'}`}>
                  Your cart is empty
                </p>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3 rounded-lg ${
                        isCafe ? 'bg-stone-50' : 'bg-zinc-800'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h4 className={`${isCafe ? 'text-stone-900' : 'text-zinc-100'}`}>
                            {item.name}
                          </h4>
                          <p className={`text-sm ${isCafe ? 'text-stone-600' : 'text-zinc-400'}`}>
                            {item.category}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className={`p-1 ${isCafe ? 'text-red-600 hover:bg-red-50' : 'text-red-400 hover:bg-red-900/20'} rounded`}
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className={`w-8 h-8 rounded-full ${
                              isCafe ? 'bg-stone-200 hover:bg-stone-300' : 'bg-zinc-700 hover:bg-zinc-600'
                            }`}
                          >
                            -
                          </button>
                          <span className={isCafe ? 'text-stone-900' : 'text-zinc-100'}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className={`w-8 h-8 rounded-full ${
                              isCafe ? 'bg-stone-200 hover:bg-stone-300' : 'bg-zinc-700 hover:bg-zinc-600'
                            }`}
                          >
                            +
                          </button>
                        </div>
                        <span className={`${isCafe ? 'text-amber-700' : 'text-amber-400'}`}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cartItems.length > 0 && (
              <div className={`p-4 border-t ${isCafe ? 'border-stone-200' : 'border-zinc-700'}`}>
                <div className="flex justify-between items-center mb-4">
                  <span className={`text-lg ${isCafe ? 'text-stone-900' : 'text-zinc-100'}`}>
                    Total:
                  </span>
                  <span className={`text-2xl font-serif ${isCafe ? 'text-amber-900' : 'text-amber-400'}`}>
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutModalOpen(true);
                  }}
                  className={`w-full py-3 rounded-lg transition-colors ${
                    isCafe
                      ? 'bg-amber-700 hover:bg-amber-800 text-white'
                      : 'bg-amber-500 hover:bg-amber-600 text-black'
                  }`}
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Reservation Modal */}
      {isReservationModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto ${
            isCafe ? 'bg-white' : 'bg-zinc-900'
          }`}>
            <div className={`p-6 border-b ${isCafe ? 'border-stone-200' : 'border-zinc-700'}`}>
              <div className="flex justify-between items-center">
                <h3 className={`text-2xl font-serif ${isCafe ? 'text-amber-900' : 'text-amber-400'}`}>
                  Book Your Table
                </h3>
                <button
                  onClick={() => setIsReservationModalOpen(false)}
                  className={`p-2 rounded-lg ${isCafe ? 'hover:bg-stone-100' : 'hover:bg-zinc-800'}`}
                >
                  <svg className={`w-6 h-6 ${isCafe ? 'text-stone-700' : 'text-zinc-300'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <form onSubmit={handleReservationSubmit} className="p-6 space-y-4">
              <div>
                <label className={`block mb-2 ${isCafe ? 'text-stone-700' : 'text-zinc-300'}`}>
                  Table Type
                </label>
                <input
                  type="text"
                  value={reservationForm.tableType}
                  readOnly
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isCafe
                      ? 'border-stone-300 bg-stone-50'
                      : 'border-zinc-700 bg-zinc-800 text-zinc-100'
                  }`}
                />
              </div>

              <div>
                <label className={`block mb-2 ${isCafe ? 'text-stone-700' : 'text-zinc-300'}`}>
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={reservationForm.name}
                  onChange={(e) => setReservationForm({ ...reservationForm, name: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isCafe
                      ? 'border-stone-300 bg-white'
                      : 'border-zinc-700 bg-zinc-800 text-zinc-100'
                  }`}
                />
              </div>

              <div>
                <label className={`block mb-2 ${isCafe ? 'text-stone-700' : 'text-zinc-300'}`}>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={reservationForm.phone}
                  onChange={(e) => setReservationForm({ ...reservationForm, phone: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isCafe
                      ? 'border-stone-300 bg-white'
                      : 'border-zinc-700 bg-zinc-800 text-zinc-100'
                  }`}
                />
              </div>

              <div>
                <label className={`block mb-2 ${isCafe ? 'text-stone-700' : 'text-zinc-300'}`}>
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={reservationForm.email}
                  onChange={(e) => setReservationForm({ ...reservationForm, email: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isCafe
                      ? 'border-stone-300 bg-white'
                      : 'border-zinc-700 bg-zinc-800 text-zinc-100'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block mb-2 ${isCafe ? 'text-stone-700' : 'text-zinc-300'}`}>
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={reservationForm.date}
                    onChange={(e) => setReservationForm({ ...reservationForm, date: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isCafe
                        ? 'border-stone-300 bg-white'
                        : 'border-zinc-700 bg-zinc-800 text-zinc-100'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block mb-2 ${isCafe ? 'text-stone-700' : 'text-zinc-300'}`}>
                    Time *
                  </label>
                  <input
                    type="time"
                    required
                    value={reservationForm.time}
                    onChange={(e) => setReservationForm({ ...reservationForm, time: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isCafe
                        ? 'border-stone-300 bg-white'
                        : 'border-zinc-700 bg-zinc-800 text-zinc-100'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className={`block mb-2 ${isCafe ? 'text-stone-700' : 'text-zinc-300'}`}>
                  Number of Guests *
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={reservationForm.guests}
                  onChange={(e) => setReservationForm({ ...reservationForm, guests: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isCafe
                      ? 'border-stone-300 bg-white'
                      : 'border-zinc-700 bg-zinc-800 text-zinc-100'
                  }`}
                />
              </div>

              <div>
                <label className={`block mb-2 ${isCafe ? 'text-stone-700' : 'text-zinc-300'}`}>
                  Special Requests
                </label>
                <textarea
                  rows={3}
                  value={reservationForm.requests}
                  onChange={(e) => setReservationForm({ ...reservationForm, requests: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isCafe
                      ? 'border-stone-300 bg-white'
                      : 'border-zinc-700 bg-zinc-800 text-zinc-100'
                  }`}
                  placeholder="Any dietary restrictions or special occasions?"
                />
              </div>

              <button
                type="submit"
                className={`w-full py-3 rounded-lg transition-colors ${
                  isCafe
                    ? 'bg-amber-700 hover:bg-amber-800 text-white'
                    : 'bg-amber-500 hover:bg-amber-600 text-black'
                }`}
              >
                Confirm Reservation
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto ${
            isCafe ? 'bg-white' : 'bg-zinc-900'
          }`}>
            <div className={`p-6 border-b ${isCafe ? 'border-stone-200' : 'border-zinc-700'}`}>
              <div className="flex justify-between items-center">
                <h3 className={`text-2xl font-serif ${isCafe ? 'text-amber-900' : 'text-amber-400'}`}>
                  Checkout
                </h3>
                <button
                  onClick={() => setIsCheckoutModalOpen(false)}
                  className={`p-2 rounded-lg ${isCafe ? 'hover:bg-stone-100' : 'hover:bg-zinc-800'}`}
                >
                  <svg className={`w-6 h-6 ${isCafe ? 'text-stone-700' : 'text-zinc-300'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <form onSubmit={handleCheckout} className="p-6 space-y-4">
              <div>
                <label className={`block mb-2 ${isCafe ? 'text-stone-700' : 'text-zinc-300'}`}>
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={orderForm.name}
                  onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isCafe
                      ? 'border-stone-300 bg-white'
                      : 'border-zinc-700 bg-zinc-800 text-zinc-100'
                  }`}
                />
              </div>

              <div>
                <label className={`block mb-2 ${isCafe ? 'text-stone-700' : 'text-zinc-300'}`}>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={orderForm.phone}
                  onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isCafe
                      ? 'border-stone-300 bg-white'
                      : 'border-zinc-700 bg-zinc-800 text-zinc-100'
                  }`}
                />
              </div>

              <div>
                <label className={`block mb-2 ${isCafe ? 'text-stone-700' : 'text-zinc-300'}`}>
                  Order Type *
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="pickup"
                      checked={orderForm.deliveryType === 'pickup'}
                      onChange={(e) => setOrderForm({ ...orderForm, deliveryType: 'pickup' })}
                      className="mr-2"
                    />
                    <span className={isCafe ? 'text-stone-700' : 'text-zinc-300'}>
                      Pickup
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="delivery"
                      checked={orderForm.deliveryType === 'delivery'}
                      onChange={(e) => setOrderForm({ ...orderForm, deliveryType: 'delivery' })}
                      className="mr-2"
                    />
                    <span className={isCafe ? 'text-stone-700' : 'text-zinc-300'}>
                      Delivery
                    </span>
                  </label>
                </div>
              </div>

              {orderForm.deliveryType === 'delivery' && (
                <div>
                  <label className={`block mb-2 ${isCafe ? 'text-stone-700' : 'text-zinc-300'}`}>
                    Delivery Address *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={orderForm.address}
                    onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isCafe
                        ? 'border-stone-300 bg-white'
                        : 'border-zinc-700 bg-zinc-800 text-zinc-100'
                    }`}
                    placeholder="Enter your delivery address"
                  />
                </div>
              )}

              <div className={`p-4 rounded-lg ${isCafe ? 'bg-stone-50' : 'bg-zinc-800'}`}>
                <div className="flex justify-between mb-2">
                  <span className={isCafe ? 'text-stone-700' : 'text-zinc-300'}>
                    Subtotal ({cartCount} items):
                  </span>
                  <span className={isCafe ? 'text-stone-900' : 'text-zinc-100'}>
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                {orderForm.deliveryType === 'delivery' && (
                  <div className="flex justify-between mb-2">
                    <span className={isCafe ? 'text-stone-700' : 'text-zinc-300'}>
                      Delivery Fee:
                    </span>
                    <span className={isCafe ? 'text-stone-900' : 'text-zinc-100'}>
                      $3.99
                    </span>
                  </div>
                )}
                <div className={`flex justify-between pt-2 border-t ${
                  isCafe ? 'border-stone-200' : 'border-zinc-700'
                }`}>
                  <span className={`text-lg ${isCafe ? 'text-stone-900' : 'text-zinc-100'}`}>
                    Total:
                  </span>
                  <span className={`text-xl font-serif ${isCafe ? 'text-amber-900' : 'text-amber-400'}`}>
                    ${(cartTotal + (orderForm.deliveryType === 'delivery' ? 3.99 : 0)).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className={`w-full py-3 rounded-lg transition-colors ${
                  isCafe
                    ? 'bg-amber-700 hover:bg-amber-800 text-white'
                    : 'bg-amber-500 hover:bg-amber-600 text-black'
                }`}
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}