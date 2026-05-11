import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import AttractionCard from '../components/AttractionCard';
import { MapPin, Info, Shield, Wind, Sunrise, Mountain } from 'lucide-react';

const AttractionsPage = ({ t, filteredAttractions, setSelectedAttraction }) => {
    const { category } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [category]);

    // Grouping & Data Selection
    const fortSubIds = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16];
    const fortSubAttractions = filteredAttractions.filter(a => fortSubIds.includes(a.id));
    
    const categoriesData = {
        'fort': {
            main: filteredAttractions.find(a => a.id === 1),
            subs: fortSubAttractions,
            icon: Shield,
            theme: "from-royal-gold to-orange-500",
            title: t.pillars.fort.title,
            subtitle: t.attractionsPage.categories.fort.subtitle
        },
        'nature': {
            main: filteredAttractions.find(a => a.id === 2),
            subs: filteredAttractions.filter(a => a.id === 18),
            icon: Wind,
            theme: "from-green-600 to-teal-500",
            title: t.pillars.nature.title,
            subtitle: t.attractionsPage.categories.nature.subtitle
        },
        'spiritual': {
            main: filteredAttractions.find(a => a.id === 3),
            subs: filteredAttractions.filter(a => a.id === 17),
            icon: Sunrise,
            theme: "from-blue-600 to-purple-500",
            title: t.pillars.spiritual.title,
            subtitle: t.attractionsPage.categories.spiritual.subtitle
        },
        'scenic': {
            main: filteredAttractions.find(a => a.id === 15),
            subs: filteredAttractions.filter(a => a.id === 19),
            icon: Mountain,
            theme: "from-amber-600 to-red-500",
            title: t.pillars.scenic.title,
            subtitle: t.attractionsPage.categories.scenic.subtitle
        }
    };

    const activeCat = categoriesData[category] || categoriesData['fort'];
    const { main, subs, icon: Icon, theme, title, subtitle } = activeCat;

    if (!main) return <div className="text-white pt-40 text-center">Loading...</div>;

    return (
        <div className="pt-32 pb-24 max-w-[1440px] mx-auto px-4 md:px-12 min-h-screen">
            
            {/* Header Section */}
            <div className="mb-20">
                <div className="flex items-center gap-6 mb-4">
                    <motion.div 
                        initial={{ rotate: -10, scale: 0.8 }}
                        animate={{ rotate: 0, scale: 1 }}
                        className={`p-4 rounded-2xl bg-gradient-to-br ${theme} shadow-2xl`}
                    >
                        <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <div>
                        <h1 className="text-4xl md:text-6xl font-serif text-white">{title}</h1>
                        <p className="text-royal-gold font-bold uppercase tracking-[0.4em] text-xs md:text-base mt-2">{subtitle}</p>
                    </div>
                </div>
                <div className="h-1 w-full bg-gradient-to-r from-royal-gold to-transparent opacity-30 rounded-full"></div>
            </div>

            {/* Immersive Detail Card */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-[3rem] overflow-hidden border-white/5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] mb-20"
            >
                <div className="grid lg:grid-cols-2">
                    <div className="h-[400px] lg:h-auto group overflow-hidden">
                        <img 
                            src={main.image} 
                            alt={main.name} 
                            className="w-full h-full object-cover transition-transform duration-[5s] group-hover:scale-110" 
                        />
                    </div>
                    <div className="p-8 lg:p-20 flex flex-col justify-center relative overflow-hidden">
                        {/* Background Ornament */}
                        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                            <Icon className="w-40 h-40" />
                        </div>

                        <h2 className="text-3xl md:text-5xl font-serif text-white mb-8 leading-tight">{main.name}</h2>
                        
                        <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed italic mb-10 border-l-4 border-royal-gold pl-6">
                            "{main.desc}"
                        </p>

                        <div className="grid grid-cols-2 gap-8 mb-12">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-royal-gold/10">
                                    <MapPin className="w-5 h-5 text-royal-gold" />
                                </div>
                                <div className="text-sm">
                                    <p className="text-gray-500 uppercase tracking-widest text-[10px]">{t.attractionsPage.location}</p>
                                    <p className="text-white font-bold">{t.attractionsPage.chittorgarh}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-royal-gold/10">
                                    <Info className="w-5 h-5 text-royal-gold" />
                                </div>
                                <div className="text-sm">
                                    <p className="text-gray-500 uppercase tracking-widest text-[10px]">{t.attractionsPage.bestTime}</p>
                                    <p className="text-white font-bold">{main.bestTime}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Sub-attractions Grid */}
            {subs.length > 0 && (
                <div className="mt-12">
                    <div className="flex items-center gap-6 mb-16">
                        <h3 className="text-2xl md:text-3xl font-serif text-white whitespace-nowrap">{t.attractionsPage.treasureTitle}</h3>
                        <div className="h-px flex-1 bg-gradient-to-r from-royal-gold to-transparent"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        <AnimatePresence>
                            {subs.map(item => (
                                <AttractionCard 
                                    key={`fort-sub-${item.id}`} 
                                    attraction={item} 
                                    onExplore={setSelectedAttraction} 
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            )}

            {/* Quick Navigation to Other Pillars */}
            <div className="mt-32 pt-20 border-t border-white/10">
                <h4 className="text-center text-gray-500 uppercase tracking-[0.5em] text-xs mb-12">{t.attractionsPage.exploreAnother}</h4>
                <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                    {Object.entries(categoriesData).map(([key, data]) => (
                        key !== category && (
                            <Link 
                                key={key}
                                to={`/attractions/${key}`}
                                className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-royal-gold/50 transition-all hover:bg-royal-gold/5"
                            >
                                <div className={`p-2 rounded-lg bg-gradient-to-br ${data.theme} shadow-lg`}>
                                    <data.icon className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-white/60 group-hover:text-white font-bold uppercase tracking-widest text-[10px]">{data.title}</span>
                            </Link>
                        )
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AttractionsPage;
