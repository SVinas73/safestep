import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Función para comprimir imágenes
function compressImage(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Redimensionar si es muy grande
        const MAX_WIDTH = 1920;
        const MAX_HEIGHT = 1080;
        
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        resolve({
          name: file.name,
          src: canvas.toDataURL('image/jpeg', 0.8)
        });
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

// Componente de Header con logo SafeStep
function NeonHeader() {
  return (
    <header className="py-12 flex flex-col items-center gap-6">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <svg 
          width="220" 
          height="220" 
          viewBox="0 0 220 220" 
          className="drop-shadow-2xl"
        >
          <rect 
            x="40" 
            y="95" 
            width="45" 
            height="30" 
            rx="15" 
            fill="none"
            stroke="url(#gradient1)" 
            strokeWidth="6"
            style={{
              filter: 'drop-shadow(0 0 10px rgba(139,92,246,0.6))'
            }}
          />
          
          <rect 
            x="135" 
            y="95" 
            width="45" 
            height="30" 
            rx="15" 
            fill="none"
            stroke="url(#gradient1)" 
            strokeWidth="6"
            style={{
              filter: 'drop-shadow(0 0 10px rgba(59,130,246,0.6))'
            }}
          />
          
          <rect 
            x="75" 
            y="70" 
            width="70" 
            height="80" 
            rx="12" 
            fill="rgba(15,15,30,0.9)"
            stroke="url(#gradient2)" 
            strokeWidth="4"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(139,92,246,0.5)) drop-shadow(0 0 40px rgba(59,130,246,0.3))'
            }}
          />
          
          <rect 
            x="82" 
            y="80" 
            width="56" 
            height="60" 
            rx="8" 
            fill="url(#screenGradient)"
          />
          
          <motion.path
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            d="M 110 95 L 120 110 L 115 110 L 115 125 L 105 125 L 105 110 L 100 110 Z"
            fill="#60a5fa"
            style={{
              filter: 'drop-shadow(0 0 8px rgba(96,165,250,0.9))'
            }}
          />
          
          <motion.g
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <path 
              d="M 105 55 Q 110 48 115 55" 
              stroke="#8b5cf6" 
              strokeWidth="3" 
              fill="none"
              strokeLinecap="round"
              style={{
                filter: 'drop-shadow(0 0 6px rgba(139,92,246,0.8))'
              }}
            />
            <path 
              d="M 100 50 Q 110 40 120 50" 
              stroke="#8b5cf6" 
              strokeWidth="3" 
              fill="none"
              strokeLinecap="round"
              style={{
                filter: 'drop-shadow(0 0 8px rgba(139,92,246,0.7))'
              }}
            />
            <path 
              d="M 95 45 Q 110 32 125 45" 
              stroke="#8b5cf6" 
              strokeWidth="3" 
              fill="none"
              strokeLinecap="round"
              style={{
                filter: 'drop-shadow(0 0 10px rgba(139,92,246,0.6))'
              }}
            />
          </motion.g>
          
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="screenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(139,92,246,0.2)" />
              <stop offset="100%" stopColor="rgba(59,130,246,0.1)" />
            </linearGradient>
          </defs>
        </svg>
        
        <motion.div
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 -z-10 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.3), transparent 70%)',
            filter: 'blur(50px)'
          }}
        />
      </motion.div>

      <div className="text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl font-black mb-2" 
          style={{
            background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 30px rgba(139,92,246,0.5)'
          }}
        >
          SafeStep
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-blue-300 font-semibold"
        >
          
        </motion.div>
      </div>
    </header>
  );
}

function Nav({ setView, view }) {
  const items = ['Inicio', 'Integrantes', 'Objetivo', 'Informes', 'Componentes'];
  
  return (
    <nav className="flex gap-4 flex-wrap justify-center mb-8 px-4">
      {items.map(item => (
        <motion.button
          key={item}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setView(item)}
          className={`relative px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
            view === item 
              ? 'text-white' 
              : 'text-blue-200 hover:text-white'
          }`}
          style={{
            background: view === item 
              ? 'linear-gradient(135deg, rgba(139,92,246,0.4), rgba(59,130,246,0.4))'
              : 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(59,130,246,0.1))',
            border: view === item 
              ? '2px solid rgba(139,92,246,0.6)' 
              : '1px solid rgba(139,92,246,0.2)',
            boxShadow: view === item 
              ? '0 0 20px rgba(139,92,246,0.4), 0 4px 20px rgba(0,0,0,0.3)' 
              : '0 2px 10px rgba(0,0,0,0.2)'
          }}
        >
          {item}
        </motion.button>
      ))}
    </nav>
  );
}

function ImageUploader({ onUpload, multiple = false, label = "Subir fotos" }) {
  async function handleUpload(e) {
    const files = Array.from(e.target.files);
    const compressedImages = await Promise.all(files.map(file => compressImage(file)));
    onUpload(compressedImages);
  }

  return (
    <label className="inline-block cursor-pointer">
      <input 
        multiple={multiple} 
        onChange={handleUpload} 
        type="file" 
        accept="image/*" 
        className="hidden" 
      />
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-3 rounded-full font-semibold"
        style={{
          background: 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(59,130,246,0.3))',
          border: '1px solid rgba(139,92,246,0.4)',
          boxShadow: '0 0 20px rgba(139,92,246,0.2)'
        }}
      >
        {label}
      </motion.div>
    </label>
  );
}

function Inicio() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto p-12 rounded-3xl"
      style={{
        background: 'linear-gradient(135deg, rgba(10,10,30,0.95), rgba(15,15,45,0.95))',
        border: '3px solid rgba(139,92,246,0.4)',
        boxShadow: '0 15px 60px rgba(0,0,0,0.6), 0 0 100px rgba(139,92,246,0.2)'
      }}
    >
      <motion.h3 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="text-6xl font-black mb-8 tracking-widest uppercase" 
        style={{
          fontFamily: 'Orbitron, sans-serif',
          background: 'linear-gradient(135deg, #8b5cf6, #3b82f6, #06b6d4)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 50px rgba(139,92,246,0.6)'
        }}
      >
        BIENVENIDO
      </motion.h3>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-y-6"
      >
        <p className="text-2xl leading-relaxed text-slate-200 font-semibold tracking-wide" 
          style={{ 
            fontFamily: 'Rajdhani, sans-serif',
            fontWeight: 600,
            textShadow: '0 2px 10px rgba(0,0,0,0.5)'
          }}
        >
          Esta es la página oficial del proyecto <span className="text-cyan-400 font-black" style={{ fontFamily: 'Orbitron, sans-serif' }}>SAFESTEP</span>, 
          una pulsera innovadora diseñada para personas con baja visión o ceguera.
        </p>
        
        <div className="flex items-center gap-4 p-6 rounded-2xl" style={{
          background: 'rgba(139,92,246,0.1)',
          border: '2px solid rgba(139,92,246,0.3)'
        }}>
          <div className="text-5xl">👆</div>
          <p className="text-xl text-slate-300 font-semibold" style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>
            Usa el menú superior para navegar entre las diferentes secciones y conocer más sobre nuestro trabajo!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {['Integrantes', 'Objetivo', 'Informes', 'Componentes'].map((section, idx) => (
            <motion.div
              key={section}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + idx * 0.1 }}
              className="p-4 rounded-xl text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(59,130,246,0.15))',
                border: '1px solid rgba(139,92,246,0.4)'
              }}
            >
              <div className="text-3xl mb-2">
                {idx === 0 && '👥'}
                {idx === 1 && '🎯'}
                {idx === 2 && '📊'}
                {idx === 3 && '🔧'}
              </div>
              <div className="text-lg font-bold tracking-wide text-slate-200" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                {section}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}

function SeccionIntegrantes({ members, membersPhoto, setMembersPhoto }) {
  const MODO_PRESENTACION = true; // Cambia a true para presentar

  const deletePhoto = (index) => {
    setMembersPhoto(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto p-10 rounded-3xl"
      style={{
        background: 'linear-gradient(135deg, rgba(15,15,30,0.95), rgba(20,20,40,0.95))',
        border: '2px solid rgba(139,92,246,0.3)',
        boxShadow: '0 12px 40px rgba(0,0,0,0.5), 0 0 60px rgba(139,92,246,0.15)'
      }}
    >
      <h3 className="text-5xl font-black mb-8 tracking-widest uppercase"
        style={{
          fontFamily: 'Orbitron, sans-serif',
          background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 40px rgba(139,92,246,0.5)'
        }}
      >
        › EQUIPO
      </h3>
      
      <div className="mb-10 p-6 rounded-2xl" style={{
        background: 'rgba(139,92,246,0.05)',
        border: '1px solid rgba(139,92,246,0.2)'
      }}>
        <ul className="space-y-4">
          {members.map((member, idx) => (
            <li key={idx} className="flex items-center gap-4 text-2xl">
              <div className="w-3 h-3 rounded-full" style={{
                background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                boxShadow: '0 0 15px rgba(139,92,246,0.6)'
              }} />
              <span className="text-slate-100 font-bold tracking-wide" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                {member.name}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {membersPhoto.length > 0 && (
        <div className="border-t-2 border-purple-500/30 pt-8">
          <h4 className="text-3xl font-black mb-6 tracking-widest uppercase text-cyan-300" 
            style={{ fontFamily: 'Orbitron, sans-serif', textShadow: '0 0 20px rgba(6,182,212,0.5)' }}>
            › FOTOGRAFÍA DEL EQUIPO
          </h4>
          
          {!MODO_PRESENTACION && (
            <div className="mb-6">
              <ImageUploader 
                onUpload={(list) => setMembersPhoto(list)} 
                label="📷 SUBIR FOTO"
              />
            </div>
          )}
          
          <div>
            {membersPhoto.map((photo, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative group"
              >
                <img
                  src={photo.src}
                  alt={photo.name}
                  className="w-full h-auto max-h-[600px] object-cover rounded-3xl"
                  style={{
                    border: '3px solid rgba(139,92,246,0.5)',
                    boxShadow: '0 15px 60px rgba(0,0,0,0.6), 0 0 80px rgba(139,92,246,0.3)'
                  }}
                />
                {!MODO_PRESENTACION && (
                  <button
                    onClick={() => deletePhoto(idx)}
                    className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white rounded-full w-14 h-14 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity font-black text-2xl"
                    style={{
                      boxShadow: '0 0 30px rgba(239,68,68,0.8)'
                    }}
                  >
                    ✕
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.section>
  );
}

function formatTextWithHighlights(text) {
  if (!text) return text;
  
  const lines = text.split('\n');
  
  return lines.map((line, lineIdx) => {
    const datePattern = /(\d{1,2}\s+de\s+\w+\s+de\s+\d{4}|\d{1,2}\/\d{1,2}\/\d{4})/gi;
    const titlePattern = /^([^:]+:)/;
    
    const hasTwoPoints = titlePattern.test(line);
    
    if (hasTwoPoints) {
      const [title, ...rest] = line.split(':');
      return (
        <div key={lineIdx} className="mb-4">
          <div 
            className="font-black tracking-wide mb-2 inline-block"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              color: '#06b6d4',
              textShadow: '0 0 20px rgba(6,182,212,0.6)',
              background: 'rgba(6,182,212,0.1)',
              padding: '4px 12px',
              borderRadius: '8px',
              border: '1px solid rgba(6,182,212,0.3)',
              fontSize: '1.1em'
            }}
          >
            {title}:
          </div>
          <div className="pl-4">
            {rest.join(':').split(datePattern).map((part, idx) => {
              if (datePattern.test(part)) {
                return (
                  <span 
                    key={idx}
                    className="font-black tracking-wide"
                    style={{
                      fontFamily: 'Orbitron, sans-serif',
                      color: '#8b5cf6',
                      textShadow: '0 0 15px rgba(139,92,246,0.6)',
                      background: 'rgba(139,92,246,0.1)',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      border: '1px solid rgba(139,92,246,0.3)'
                    }}
                  >
                    {part}
                  </span>
                );
              }
              return part;
            })}
          </div>
        </div>
      );
    }
    
    return (
      <div key={lineIdx} className="mb-2">
        {line.split(datePattern).map((part, idx) => {
          if (datePattern.test(part)) {
            return (
              <span 
                key={idx}
                className="font-black tracking-wide"
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  color: '#8b5cf6',
                  textShadow: '0 0 15px rgba(139,92,246,0.6)',
                  background: 'rgba(139,92,246,0.1)',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  border: '1px solid rgba(139,92,246,0.3)'
                }}
              >
                {part}
              </span>
            );
          }
          return part;
        })}
      </div>
    );
  });
}

function SeccionObjetivo({ objetivoPhotos, setObjetivoPhotos }) {
  const MODO_PRESENTACION = true; // Cambia a true

  const [objetivo, setObjetivo] = useState(() => {
    const saved = localStorage.getItem('safestep_objetivo');
    return saved || '';
  });

  //React.useEffect(() => {
    //localStorage.setItem('safestep_objetivo', objetivo);
  //}, [objetivo]);

  const deletePhoto = (index) => {
    setObjetivoPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const updatePhotoDescription = (index, description) => {
    setObjetivoPhotos(prev => prev.map((photo, i) => 
      i === index ? { ...photo, description } : photo
    ));
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto p-10 rounded-3xl"
      style={{
        background: 'linear-gradient(135deg, rgba(15,15,30,0.95), rgba(20,20,40,0.95))',
        border: '2px solid rgba(139,92,246,0.3)',
        boxShadow: '0 12px 40px rgba(0,0,0,0.5), 0 0 60px rgba(139,92,246,0.15)'
      }}
    >
      <h3 className="text-5xl font-black mb-8 tracking-widest uppercase"
        style={{
          fontFamily: 'Orbitron, sans-serif',
          background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 40px rgba(139,92,246,0.5)'
        }}
      >
        › OBJETIVO
      </h3>
      
      {MODO_PRESENTACION ? (
        <div className="text-xl leading-relaxed text-slate-100 mb-10 p-6 rounded-2xl"
          style={{
            fontFamily: 'Rajdhani, sans-serif',
            fontWeight: 600,
            fontSize: '1.25rem',
            letterSpacing: '0.5px',
            background: 'rgba(10,10,30,0.5)',
            border: '2px solid rgba(139,92,246,0.3)'
          }}
        >
          {formatTextWithHighlights(objetivo)}
        </div>
      ) : (
        <textarea
          value={objetivo}
          onChange={(e) => setObjetivo(e.target.value)}
          className="w-full p-6 rounded-2xl text-slate-50 mb-10 leading-relaxed"
          rows={6}
          placeholder="Describe el objetivo principal de SafeStep..."
          spellCheck="false"
          autoComplete="off"
          style={{
            background: 'rgba(10,10,30,0.8)',
            border: '2px solid rgba(139,92,246,0.5)',
            boxShadow: 'inset 0 6px 30px rgba(0,0,0,0.6), 0 0 40px rgba(139,92,246,0.15)',
            outline: 'none',
            fontFamily: 'Rajdhani, sans-serif',
            fontWeight: 600,
            fontSize: '1.25rem',
            letterSpacing: '0.5px'
          }}
        />
      )}

      {objetivoPhotos.length > 0 && (
        <div className="border-t-2 border-purple-500/30 pt-8">
          <h4 className="text-3xl font-black mb-6 tracking-widest uppercase text-cyan-300" 
            style={{ fontFamily: 'Orbitron, sans-serif', textShadow: '0 0 20px rgba(6,182,212,0.5)' }}>
            › IMPLEMENTACION DE COMPONENTES
          </h4>
          
          {!MODO_PRESENTACION && (
            <div className="mb-6">
              <ImageUploader 
                onUpload={(list) => setObjetivoPhotos(prev => [...prev, ...list.map(photo => ({ ...photo, description: '' }))])} 
                multiple={true}
                label="📷 AGREGAR IMÁGENES"
              />
            </div>
          )}
          
          <div className="space-y-8">
            {objetivoPhotos.map((photo, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative rounded-2xl p-6"
                style={{
                  background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(59,130,246,0.08))',
                  border: '2px solid rgba(139,92,246,0.3)',
                }}
              >
                {!MODO_PRESENTACION && (
                  <button
                    onClick={() => deletePhoto(idx)}
                    className="absolute top-4 right-4 z-10 bg-red-500 hover:bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center transition-all font-black text-xl"
                    style={{
                      boxShadow: '0 0 30px rgba(239,68,68,0.6)'
                    }}
                  >
                    ✕
                  </button>
                )}

                <div className="grid md:grid-cols-5 gap-6">
                  <div className="md:col-span-2">
                    <img
                      src={photo.src}
                      alt={photo.name}
                      className="w-full h-full min-h-[300px] object-cover rounded-xl"
                      style={{
                        border: '2px solid rgba(139,92,246,0.4)',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.4)'
                      }}
                    />
                  </div>

                  <div className="md:col-span-3 flex flex-col">
                    {!MODO_PRESENTACION && (
                      <label className="text-lg text-cyan-300 mb-3 font-black tracking-wide uppercase" 
                        style={{ fontFamily: 'Orbitron, sans-serif' }}>
                        DESCRIPCIÓN
                      </label>
                    )}
                    
                    {MODO_PRESENTACION ? (
                      <div className="text-lg leading-relaxed text-slate-100 p-4"
                        style={{
                          fontFamily: 'Rajdhani, sans-serif',
                          fontWeight: 600,
                          fontSize: '1.125rem',
                          letterSpacing: '0.3px',
                          lineHeight: '1.8'
                        }}
                      >
                        {formatTextWithHighlights(photo.description)}
                      </div>
                    ) : (
                      <textarea
                        value={photo.description || ''}
                        onChange={(e) => updatePhotoDescription(idx, e.target.value)}
                        placeholder="Describe en detalle qué muestra esta imagen..."
                        className="w-full h-full p-5 rounded-xl text-slate-50 resize-none leading-relaxed"
                        spellCheck="false"
                        style={{
                          background: 'rgba(10,10,30,0.7)',
                          border: '2px solid rgba(139,92,246,0.4)',
                          boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.4)',
                          outline: 'none',
                          minHeight: '300px',
                          fontFamily: 'Rajdhani, sans-serif',
                          fontWeight: 600,
                          fontSize: '1.25rem',
                          letterSpacing: '0.3px',
                          lineHeight: '1.8'
                        }}
                      />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.section>
  );
}

// NUEVO: Componente para videos de Google Drive, YouTube, etc
function VideoPlayer({ video }) {
  // Detectar si es un video de YouTube
  if (video.type === 'youtube' || video.src.includes('youtube.com') || video.src.includes('youtu.be')) {
    let embedUrl = video.src;
    
    if (video.src.includes('watch?v=')) {
      const videoId = video.src.split('watch?v=')[1].split('&')[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (video.src.includes('youtu.be/')) {
      const videoId = video.src.split('youtu.be/')[1].split('?')[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    }
    
    return (
      <iframe
        src={embedUrl}
        className="w-full h-80 rounded-2xl"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          border: '2px solid rgba(168,85,247,0.5)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.5), 0 0 30px rgba(168,85,247,0.2)',
          background: '#000'
        }}
      />
    );
  }
  
  // Detectar si es Google Drive
  if (video.type === 'drive' || video.src.includes('drive.google.com')) {
    let embedUrl = video.src;
    
    // Convertir URL de Google Drive a formato embed
    if (video.src.includes('/file/d/')) {
      const fileId = video.src.split('/file/d/')[1].split('/')[0];
      embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
    }
    
    return (
      <iframe
        src={embedUrl}
        className="w-full h-80 rounded-2xl"
        frameBorder="0"
        allow="autoplay"
        allowFullScreen
        style={{
          border: '2px solid rgba(168,85,247,0.5)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.5), 0 0 30px rgba(168,85,247,0.2)',
          background: '#000'
        }}
      />
    );
  }
  
  // Video local (fallback)
  return (
    <video
      src={video.src}
      controls
      preload="metadata"
      className="w-full h-80 rounded-2xl"
      controlsList="nodownload"
      playsInline
      style={{
        border: '2px solid rgba(168,85,247,0.5)',
        boxShadow: '0 10px 40px rgba(0,0,0,0.5), 0 0 30px rgba(168,85,247,0.2)',
        background: '#000',
        objectFit: 'contain'
      }}
    >
      Tu navegador no soporta el elemento video.
    </video>
  );
}


function SeccionInformes({ avances, setAvances }) {
  const MODO_PRESENTACION = true;
  const [selectedAvance, setSelectedAvance] = useState(null);

  function addAvance() {
    const id = Date.now();
    const num = avances.length + 1;
    setAvances(prev => [...prev, { 
      id, 
      title: `Avance ${num}`, 
      text: '', 
      photos: [],
      videos: []
    }]);
  }

  function formatTextWithDates(text) {
    if (!text) return text;
  
    const lines = text.split('\n');
    const datePattern = /(\d{1,2}\s+de\s+\w+\s+de\s+\d{4}|\d{1,2}\/\d{1,2}\/\d{4})/gi;
  
    return lines.map((line, lineIdx) => {
      const parts = line.split(datePattern);
    
      return (
        <div key={lineIdx} className="mb-2">
          {parts.map((part, idx) => {
            if (datePattern.test(part)) {
              return (
                <span 
                  key={idx}
                  className="font-black tracking-wide"
                  style={{
                    fontFamily: 'Orbitron, sans-serif',
                    color: '#8b5cf6',
                    textShadow: '0 0 15px rgba(139,92,246,0.6)',
                    background: 'rgba(139,92,246,0.1)',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    border: '1px solid rgba(139,92,246,0.3)'
                  }}
                >
                  {part}
                </span>
              );
            }
            return part;
          })}
        </div>
      );
    });
  }

  function updateAvanceText(id, text) {
    setAvances(prev => prev.map(a => a.id === id ? { ...a, text } : a));
  }

  function updateAvancePhotos(id, list) {
    setAvances(prev => prev.map(a => 
      a.id === id ? { ...a, photos: [...a.photos, ...list] } : a
    ));
  }

  function updateAvanceVideos(id, files) {
    if (!files || files.length === 0) return;

    const videoList = Array.from(files).map(file => {
      try {
        return {
          name: file.name,
          src: URL.createObjectURL(file),
          type: 'video'
        };
      } catch (error) {
        console.error('Error al procesar video:', error);
        alert(`Error al cargar ${file.name}`);
        return null;
      }
    });

    const validVideos = videoList.filter(v => v !== null);

    if (validVideos.length > 0) {
      setAvances(prev => prev.map(a => 
        a.id === id ? { ...a, videos: [...(a.videos || []), ...validVideos] } : a
      ));
    }
  }

  function deleteAvancePhoto(avanceId, photoIndex) {
    setAvances(prev => prev.map(a => 
      a.id === avanceId 
        ? { ...a, photos: a.photos.filter((_, i) => i !== photoIndex) } 
        : a
    ));
  }

  function deleteAvanceVideo(avanceId, videoIndex) {
    setAvances(prev => prev.map(a => 
      a.id === avanceId 
        ? { ...a, videos: (a.videos || []).filter((_, i) => i !== videoIndex) } 
        : a
    ));
  }

  function deleteAvance(id) {
    if (window.confirm('¿Seguro que quieres eliminar este avance?')) {
      setAvances(prev => prev.filter(a => a.id !== id));
    }
  }

  if (selectedAvance) {
    const avance = avances.find(a => a.id === selectedAvance);
    if (!avance) {
      setSelectedAvance(null);
      return null;
    }

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{
          background: 'rgba(5,10,25,0.97)',
          backdropFilter: 'blur(15px)'
        }}
        onClick={() => setSelectedAvance(null)}
      >
        <motion.div
          initial={{ scale: 0.85, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", damping: 20 }}
          className="w-full max-w-7xl max-h-[95vh] overflow-y-auto rounded-3xl p-12"
          style={{
            background: 'linear-gradient(135deg, rgba(10,10,30,0.98), rgba(15,15,45,0.98))',
            border: '3px solid rgba(139,92,246,0.5)',
            boxShadow: '0 30px 100px rgba(0,0,0,0.8), 0 0 150px rgba(139,92,246,0.3), inset 0 0 80px rgba(139,92,246,0.05)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-start mb-10">
            <h2 className="text-7xl font-black tracking-widest uppercase"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                background: 'linear-gradient(135deg, #8b5cf6, #3b82f6, #06b6d4, #8b5cf6)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 60px rgba(139,92,246,0.5)',
                animation: 'gradient 3s ease infinite'
              }}
            >
              {avance.title}
            </h2>
            
            <div className="flex gap-4">
              
              
              <motion.button
                whileHover={{ scale: 1.15, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedAvance(null)}
                className="w-14 h-14 rounded-full flex items-center justify-center text-3xl font-bold"
                style={{
                  background: 'linear-gradient(135deg, rgba(139,92,246,0.4), rgba(59,130,246,0.4))',
                  border: '2px solid rgba(139,92,246,0.6)',
                  boxShadow: '0 0 30px rgba(139,92,246,0.4)'
                }}
              >
                ✕
              </motion.button>
            </div>
          </div>

          <div className="mb-10">
            <label className="block text-cyan-300 font-black mb-4 text-2xl tracking-widest uppercase" 
              style={{ fontFamily: 'Orbitron, sans-serif', textShadow: '0 0 20px rgba(6,182,212,0.5)' }}>
              › DESCRIPCIÓN
            </label>
  
            {MODO_PRESENTACION ? (
              <div 
                className="w-full p-6 rounded-2xl text-slate-50 text-xl leading-relaxed whitespace-pre-wrap"
                style={{
                  background: 'rgba(10,10,30,0.8)',
                  border: '2px solid rgba(139,92,246,0.5)',
                  boxShadow: 'inset 0 6px 30px rgba(0,0,0,0.6)',
                  fontFamily: 'Rajdhani, sans-serif',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  minHeight: '200px'
                }}
              >
                {formatTextWithDates(avance.text)}
              </div>
            ) : (
              <textarea
                value={avance.text}
                onChange={(e) => updateAvanceText(avance.id, e.target.value)}
                className="w-full p-6 rounded-2xl text-slate-50 text-xl leading-relaxed"
                rows={8}
                placeholder="Describe los logros, avances técnicos y detalles importantes de esta etapa del proyecto..."
                spellCheck="false"
                autoComplete="off"
                style={{
                  background: 'rgba(10,10,30,0.8)',
                  border: '2px solid rgba(139,92,246,0.5)',
                  boxShadow: 'inset 0 6px 30px rgba(0,0,0,0.6), 0 0 40px rgba(139,92,246,0.15)',
                  outline: 'none',
                  fontFamily: 'Rajdhani, sans-serif',
                  fontWeight: 600,
                  letterSpacing: '0.5px'
                }}
              />
            )}
          </div>

          

          {avance.photos.length > 0 && (
            <div className="mb-10">
              <h4 className="text-cyan-300 font-black mb-6 text-3xl tracking-widest uppercase" 
                style={{ fontFamily: 'Orbitron, sans-serif', textShadow: '0 0 20px rgba(6,182,212,0.5)' }}>
                › GALERÍA ({avance.photos.length})
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {avance.photos.map((photo, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="relative group"
                  >
                    <img
                      src={photo.src}
                      alt={photo.name}
                      className="w-full h-64 object-cover rounded-2xl"
                      style={{
                        border: '2px solid rgba(139,92,246,0.5)',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.5), 0 0 30px rgba(139,92,246,0.2)'
                      }}
                    />
                    <button
                      onClick={() => deleteAvancePhoto(avance.id, idx)}
                      className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all font-black text-xl"
                      style={{
                        boxShadow: '0 0 30px rgba(239,68,68,0.8)'
                      }}
                    >
                      ✕
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {avance.videos && avance.videos.length > 0 && (
            <div>
              <h4 className="text-purple-300 font-black mb-6 text-3xl tracking-widest uppercase" 
                style={{ fontFamily: 'Orbitron, sans-serif', textShadow: '0 0 20px rgba(168,85,247,0.5)' }}>
                › VIDEOS ({avance.videos.length})
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {avance.videos.map((video, idx) => (
                  <motion.div
                    key={`${avance.id}-video-${idx}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.03, y: -5 }}
                    className="relative group"
                  >
                    <VideoPlayer video={video} />
                    {!MODO_PRESENTACION && (
                    <button
                      onClick={() => deleteAvanceVideo(avance.id, idx)}
                      className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all font-black text-xl"
                      style={{
                        boxShadow: '0 0 30px rgba(239,68,68,0.8)'
                      }}
                    >
                      ✕
                    </button>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-8 rounded-2xl"
      style={{
        background: 'linear-gradient(135deg, rgba(15,15,30,0.9), rgba(20,20,40,0.9))',
        border: '1px solid rgba(139,92,246,0.2)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 40px rgba(139,92,246,0.1)'
      }}
    >
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-4xl font-black tracking-widest uppercase"
          style={{
            fontFamily: 'Orbitron, sans-serif',
            background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          INFORMES {avances.length > 0 && `(${avances.length})`}
        </h3>
        
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {avances.map((avance) => (
          <motion.div
            key={avance.id}
            whileHover={{ scale: 1.05, y: -8 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedAvance(avance.id)}
            className="p-8 rounded-2xl cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(59,130,246,0.15))',
              border: '2px solid rgba(139,92,246,0.4)',
              boxShadow: '0 6px 30px rgba(0,0,0,0.3), 0 0 40px rgba(139,92,246,0.1)'
            }}
          >
            <h4 className="text-3xl font-black mb-3 tracking-wide uppercase" 
              style={{ 
                fontFamily: 'Orbitron, sans-serif',
                color: '#60a5fa',
                textShadow: '0 0 20px rgba(96,165,250,0.5)'
              }}
            >
              {avance.title}
            </h4>
            <p className="text-slate-300 text-base mb-4 line-clamp-2" 
              style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>
              {avance.text || 'Sin descripción'}
            </p>
            <div className="flex items-center gap-6 text-base font-bold">
              <span className="text-purple-400">📷 {avance.photos.length}</span>
              <span className="text-pink-400">🎬 {(avance.videos || []).length}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function SeccionComponentes({ componentes, setComponentes }) {
  const MODO_PRESENTACION = true;
  const [selectedImage, setSelectedImage] = useState(null);

  const deleteComponent = (index) => {
    setComponentes(prev => prev.filter((_, i) => i !== index));
  };

  const updateComponentName = (index, name) => {
    setComponentes(prev => prev.map((comp, i) => 
      i === index ? { ...comp, customName: name } : comp
    ));
  };

  const handleUpload = async (list) => {
    const newComponents = list.map(photo => ({
      ...photo,
      customName: ''
    }));
    setComponentes(prev => [...prev, ...newComponents]);
  };

  return (
    <>
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto p-10 rounded-3xl"
        style={{
          background: 'linear-gradient(135deg, rgba(15,15,30,0.95), rgba(20,20,40,0.95))',
          border: '2px solid rgba(139,92,246,0.3)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.5), 0 0 60px rgba(139,92,246,0.15)'
        }}
      >
        <h3 className="text-5xl font-black mb-8 tracking-widest uppercase"
          style={{
            fontFamily: 'Orbitron, sans-serif',
            background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 40px rgba(139,92,246,0.5)'
          }}
        >
          › COMPONENTES
        </h3>
        
        <p className="text-slate-200 mb-8 text-2xl font-semibold tracking-wide" 
          style={{ 
            fontFamily: 'Rajdhani, sans-serif', 
            fontWeight: 600,
            letterSpacing: '0.5px'
          }}
        >
          Hardware y componentes utilizados en SafeStep
        </p>

        {!MODO_PRESENTACION && (
          <div className="mb-8">
            <ImageUploader 
              onUpload={handleUpload} 
              multiple={true}
              label="📦 SUBIR COMPONENTES"
            />
          </div>
        )}

        {componentes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {componentes.map((comp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-5 rounded-2xl relative group cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(59,130,246,0.08))',
                  border: '2px solid rgba(139,92,246,0.3)',
                  boxShadow: '0 6px 30px rgba(0,0,0,0.3)'
                }}
                onClick={() => setSelectedImage(comp.src)}
              >
                {!MODO_PRESENTACION && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteComponent(idx);
                    }}
                    className="absolute top-3 right-3 z-10 bg-red-500 hover:bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-sm font-black"
                    style={{
                      boxShadow: '0 0 20px rgba(239,68,68,0.6)'
                    }}
                  >
                    ✕
                  </button>
                )}

                <img
                  src={comp.src}
                  alt={comp.customName || comp.name}
                  className="w-full h-56 object-cover rounded-xl mb-4"
                  style={{
                    border: '2px solid rgba(139,92,246,0.3)'
                  }}
                />
                
                {MODO_PRESENTACION ? (
                  <div className="text-slate-100 text-lg font-semibold text-center leading-snug p-2"
                    style={{
                      fontFamily: 'Rajdhani, sans-serif',
                      fontWeight: 600,
                      fontSize: '1.125rem'
                    }}
                  >
                    {comp.customName || comp.name}
                  </div>
                ) : (
                  <textarea
                    value={comp.customName || ''}
                    onChange={(e) => {
                      e.stopPropagation();
                      updateComponentName(idx, e.target.value);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    placeholder="Nombre del componente y descripción breve..."
                    className="w-full p-4 rounded-lg text-slate-50 leading-relaxed"
                    rows={4}
                    spellCheck="false"
                    style={{
                      background: 'rgba(10,10,30,0.7)',
                      border: '2px solid rgba(139,92,246,0.4)',
                      outline: 'none',
                      fontFamily: 'Rajdhani, sans-serif',
                      fontWeight: 600,
                      fontSize: '1.125rem',
                      letterSpacing: '0.3px',
                      lineHeight: '1.6',
                      resize: 'vertical'
                    }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>

      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: 'rgba(0,0,0,0.95)',
            backdropFilter: 'blur(10px)'
          }}
          onClick={() => setSelectedImage(null)}
        >
          <motion.img
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            src={selectedImage}
            className="max-w-full max-h-[90vh] rounded-3xl"
            style={{
              border: '4px solid rgba(139,92,246,0.6)',
              boxShadow: '0 20px 80px rgba(0,0,0,0.8), 0 0 100px rgba(139,92,246,0.4)'
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-8 right-8 w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 text-white font-black text-3xl flex items-center justify-center"
            style={{
              boxShadow: '0 0 40px rgba(239,68,68,0.8)'
            }}
          >
            ✕
          </button>
        </motion.div>
      )}
    </>
  );
}

export default function App() {
  const [view, setView] = useState('Inicio');
  
  const [members] = useState([
    { name: 'Santiago Viñas' },
    { name: 'Juan Beracochea' },
    { name: 'Aaron Britos' }
  ]);

  const [membersPhoto, setMembersPhoto] = useState([]);
  const [objetivoPhotos, setObjetivoPhotos] = useState([]);
  const [avances, setAvances] = useState([]);
  const [componentes, setComponentes] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  // NUEVO: Cargar datos automáticamente al iniciar
  React.useEffect(() => {
    const loadData = async () => {
      try {
        localStorage.clear();
        const response = await fetch('/safestep/safestep-data.json?v=4');
        const data = await response.json();
        
        if (data.objetivo) {
          localStorage.setItem('safestep_objetivo', data.objetivo);
        }
        if (data.objetivoPhotos) {
          setObjetivoPhotos(data.objetivoPhotos);
        }
        if (data.membersPhoto) {
          setMembersPhoto(data.membersPhoto);
        }
        if (data.avances) {
          setAvances(data.avances);
        }
        if (data.componentes) {
          setComponentes(data.componentes);
        }
        
        setDataLoaded(true);
      } catch (error) {
        console.error('Error cargando datos:', error);
        setDataLoaded(true);
      }
    };
    
    loadData();
  }, []);
  

  // React.useEffect(() => {
    // localStorage.setItem('safestep_membersPhoto', JSON.stringify(membersPhoto));
  // }, [membersPhoto]);

  // React.useEffect(() => {
    // localStorage.setItem('safestep_objetivoPhotos', JSON.stringify(objetivoPhotos));
  // }, [objetivoPhotos]);

  // React.useEffect(() => {
    // try {
      // const dataString = JSON.stringify(avances);
    
    // Verificar tamaño antes de guardar
      // if (dataString.length > 4.5 * 1024 * 1024) {
        // console.warn('⚠️ Los datos son muy grandes para localStorage');
        // return;
      // }
    
      // localStorage.setItem('safestep_avances', dataString);
    // } catch (error) {
      //console.error('Error al guardar en localStorage:', error);
      //alert('⚠️ No se pudieron guardar los cambios. El almacenamiento está lleno.');
    //}
  //}, [avances]);

  //React.useEffect(() => {
    //localStorage.setItem('safestep_componentes', JSON.stringify(componentes));
  //}, [componentes]);

  return (
    <div className="min-h-screen px-4 py-8 relative overflow-hidden" 
      style={{
        background: 'linear-gradient(to bottom, #0a0e1a, #0f1624, #0a0e1a)',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Fondo animado futurista */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        {/* Partículas flotantes */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              background: i % 3 === 0 ? '#8b5cf6' : i % 3 === 1 ? '#3b82f6' : '#06b6d4',
              boxShadow: `0 0 ${Math.random() * 30 + 15}px currentColor`,
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              filter: 'blur(1px)'
            }}
            animate={{
              y: [0, Math.random() * -300 - 100, 0],
              x: [0, Math.random() * 150 - 75, 0],
              opacity: [0.1, 0.6, 0.1],
              scale: [0.8, Math.random() + 1.8, 0.8],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
          />
        ))}
  
        {/* Ondas circulares grandes */}
        <motion.div
          className="absolute rounded-full"
          style={{
            top: '20%',
            left: '15%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(139,92,246,0.15), transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          />
  
        <motion.div
          className="absolute rounded-full"
            style={{
              bottom: '15%',
              right: '20%',
              width: '600px',
              height: '600px',
              background: 'radial-gradient(circle, rgba(59,130,246,0.12), transparent 70%)',
              filter: 'blur(90px)',
            }}
            animate={{
              scale: [1.3, 1, 1.3],
              opacity: [0.3, 0.6, 0.3],
              x: [0, -40, 0],
              y: [0, -50, 0]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute rounded-full"
            style={{
              top: '50%',
              left: '50%',
              width: '400px',
              height: '400px',
              background: 'radial-gradient(circle, rgba(6,182,212,0.1), transparent 70%)',
              filter: 'blur(70px)',
              transform: 'translate(-50%, -50%)'
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
              rotate: [0, 180, 360]
            }}
            transition={{
            duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
  
          {/* Grid futurista animado */}
          <motion.svg 
            className="absolute inset-0 w-full h-full"
            style={{ opacity: 0.08 }}
            animate={{
              opacity: [0.05, 0.12, 0.05]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#8b5cf6" strokeWidth="0.5"/>
              </pattern>
              <pattern id="grid2" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="1" fill="#3b82f6" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <rect width="100%" height="100%" fill="url(#grid2)" />
          </motion.svg>

          {/* Líneas de energía que cruzan */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`line-${i}`}
              className="absolute h-px"
              style={{
                width: '100%',
                background: `linear-gradient(90deg, transparent, ${i === 0 ? '#8b5cf6' : i === 1 ? '#3b82f6' : '#06b6d4'}, transparent)`,
                top: `${20 + i * 30}%`,
                opacity: 0.15,
                boxShadow: `0 0 20px ${i === 0 ? '#8b5cf6' : i === 1 ? '#3b82f6' : '#06b6d4'}`
              }}
              animate={{
                x: ['-100%', '100%'],
                opacity: [0, 0.3, 0]
              }}
              transition={{
                duration: 10 + i * 3,
                repeat: Infinity,
                ease: "linear",
                delay: i * 4
              }}
            />
          ))}
        </div>
      <div className="relative" style={{ zIndex: 1 }}></div>    
      <NeonHeader />

      

      <Nav setView={setView} view={view} />

      <main className="pb-16">
        <AnimatePresence mode="wait">
          {view === 'Inicio' && <Inicio key="inicio" />}
          {view === 'Integrantes' && (
            <SeccionIntegrantes 
              key="integrantes"
              members={members}
              membersPhoto={membersPhoto}
              setMembersPhoto={setMembersPhoto}
            />
          )}
          {view === 'Objetivo' && (
            <SeccionObjetivo 
              key="objetivo"
              objetivoPhotos={objetivoPhotos}
              setObjetivoPhotos={setObjetivoPhotos}
            />
          )}
          {view === 'Informes' && (
            <SeccionInformes 
              key="informes"
              avances={avances}
              setAvances={setAvances}
            />
          )}
          {view === 'Componentes' && (
            <SeccionComponentes 
              key="componentes"
              componentes={componentes}
              setComponentes={setComponentes}
            />
          )}
        </AnimatePresence>
      </main>

      <footer className="text-center text-slate-400 mt-12">
        <p>SafeStep © 2025 - Tecnología para la inclusión</p>
      </footer>
    </div>
  );
}