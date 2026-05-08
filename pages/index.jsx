import React, { useState } from 'react';

export default function CopyGenerator() {
  const [messageType, setMessageType] = useState('bienvenida');
  const [notes, setNotes] = useState('');
  const [language, setLanguage] = useState('es');
  const [generated, setGenerated] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const messageTypes = {
    bienvenida: 'Bienvenida de huésped',
    agradecimiento: 'Agradecimiento',
    despedida: 'Despedida / Check-out',
    cumpleaños: 'Cumpleaños',
    cortesía: 'Cortesía (amenities, extras)',
    disculpa: 'Disculpa / Inconveniente',
    upgrade: 'Upgrade / Sorpresa',
    ocasión: 'Ocasión especial',
    recuperación: 'Recuperación (guest insatisfecho)'
  };

  const generateCopy = async () => {
    setLoading(true);
    setError(null);
    setGenerated(null);
    
    try {
      const response = await fetch('/api/generate-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messageType,
          notes,
          language,
          messageTypeLabel: messageTypes[messageType]
        })
      });

      if (!response.ok) {
        throw new Error('Error generating copy');
      }

      const data = await response.json();
      const options = data.content
        .split('\n')
        .filter(line => line.trim().length > 0)
        .slice(0, 3);
      
      setGenerated(options);
    } catch (err) {
      setError('Error al generar el copy. Intenta de nuevo.');
      console.error(err);
    }
    
    setLoading(false);
  };

  const copyToClipboard = (text) => {
    const cleanText = text.replace(/^\d+\.\s*/, '').trim();
    navigator.clipboard.writeText(cleanText).then(() => {
      alert('✓ Copiado al portapapeles');
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <div className="fixed top-0 left-0 w-96 h-96 bg-teal-500 opacity-5 rounded-full blur-3xl -z-10"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-pink-500 opacity-5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-2xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            COPY<span className="text-teal-400">.</span>
          </h1>
          <p className="text-slate-400 text-lg tracking-wide uppercase">Click Clack Copy Generator</p>
          <p className="text-slate-500 text-sm mt-3 max-w-md mx-auto">
            Genera mensajes perfectos para tus huéspedes. Frases únicas, sofisticadas y auténticas.
          </p>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 mb-8 backdrop-blur-sm">
          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-300 mb-3 uppercase tracking-widest">
              ¿Para qué es el mensaje?
            </label>
            <select
              value={messageType}
              onChange={(e) => setMessageType(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition"
            >
              {Object.entries(messageTypes).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-300 mb-3 uppercase tracking-widest">
              Notas / Detalles (opcional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ej: pareja joven, aniversario, nombre del huésped, tipo de cortesía (champagne), cualquier detalle que personalice el mensaje..."
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition placeholder:text-slate-500 resize-none"
              rows="3"
            />
          </div>

          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-300 mb-3 uppercase tracking-widest">
              Idioma
            </label>
            <div className="flex gap-4">
              {[
                { value: 'es', label: 'Español' },
                { value: 'en', label: 'English' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setLanguage(option.value)}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition ${
                    language === option.value
                      ? 'bg-teal-500 text-slate-900 shadow-lg shadow-teal-500/30'
                      : 'bg-slate-700 text-slate-300 border border-slate-600 hover:border-slate-500'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generateCopy}
            disabled={loading}
            className="w-full py-4 px-6 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 disabled:from-slate-600 disabled:to-slate-600 text-white font-black text-lg rounded-lg transition transform hover:scale-105 disabled:hover:scale-100 uppercase tracking-widest shadow-lg shadow-teal-500/30 disabled:shadow-none"
          >
            {loading ? 'Generando...' : 'Generar Copy'}
          </button>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-8 text-red-200">
            {error}
          </div>
        )}

        {generated && (
          <div className="space-y-4 animate-in">
            <div className="text-slate-400 text-sm uppercase tracking-widest mb-4">
              ✨ 3 Opciones para tu tarjeta
            </div>
            
            {generated.map((option, index) => (
              <div
                key={index}
                className="group bg-slate-800/80 border border-slate-700 rounded-lg p-6 hover:border-teal-400/50 transition cursor-pointer hover:shadow-lg hover:shadow-teal-500/10"
                onClick={() => copyToClipboard(option)}
              >
                <div className="flex items-start gap-4">
                  <div className="text-teal-400 font-black text-2xl opacity-50 group-hover:opacity-100 transition">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-100 leading-relaxed text-lg">
                      {option.replace(/^\d+\.\s*/, '').trim()}
                    </p>
                    <p className="text-slate-500 text-xs mt-3 opacity-0 group-hover:opacity-100 transition">
                      Click para copiar
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={() => setGenerated(null)}
              className="w-full py-2 px-4 text-slate-400 hover:text-slate-300 transition text-sm uppercase tracking-widest"
            >
              Limpiar
            </button>
          </div>
        )}

        <div className="mt-16 text-center text-slate-600 text-xs uppercase tracking-widest">
          <p>Click Clack Copy Generator</p>
          <p className="mt-2">Powered by Click Clack DNA</p>
        </div>
      </div>
    </div>
  );
}
