import React, { useState } from 'react';
import './App.css';

const TABLES = [
  { key: 'empleados', label: 'Empleados', icon: '👤' },
  { key: 'usuarios', label: 'Usuarios', icon: '🔐' },
  { key: 'clientes', label: 'Clientes', icon: '🧑‍💼' },
  { key: 'proveedores', label: 'Proveedores', icon: '🚚' },
  { key: 'productos', label: 'Productos', icon: '☕' },
  { key: 'ventas', label: 'Ventas', icon: '💰' },
  { key: 'inventario', label: 'Inventario', icon: '📦' },
  { key: 'facturacion', label: 'Facturación', icon: '🧾' },
  { key: 'detalleVentas', label: 'Detalle Ventas', icon: '📋' },
  { key: 'horarioLaboral', label: 'Horario Laboral', icon: '🕐' },
];

const initialForms = {
  empleados: { ID_EMPLEADO: '', NOMBRE_EMPL: '', APELLIDO_PAT: '', APELLIDO_MAT: '', FECHA_INGRESO: '', PUESTO: '', SALARIO: '', CONTACTO: '', ESTADO: '', DEPARTAMENTO: '' },
  usuarios: { ID_USUARIO: '', NOMBRE_USUARIO: '', USERNAME: '', PASSWORD: '', ID_EMPLEADO: '', FECHA_REG: '' },
  clientes: { ID_CLIENTE: '', NOMBRE: '', APELLIDO: '', RFC_CLIENTE: '', CORREO_ELEC_CLIENTE: '', NUMERO_CLIENTE: '', DIRECCION_FISCAL: '', RAZON_SOCIAL: '', REGIMEN_FISCAL: '' },
  proveedores: { ID_PROVEEDOR: '', NOMBRE_EMPRESA: '', NOMBRE_PROV: '', DIRECCION_PROV: '', RFC: '', CORREO_ELEC: '', TELEFONO_P: '' },
  productos: { ID_PRODUCTO: '', ID_PROVEEDOR: '', NOMBRE_PRODUCTO: '', PRECIO_VENTA: '' },
  ventas: { ID_VENTA: '', ID_USUARIO: '', ID_CLIENTE: '', METODO_PAGO: '', TOTAL: '', FECHA_VENTA: '' },
  inventario: { ID_INVENTARIO: '', ID_PRODUCTO: '', STOCK: '', ULTIMA_ACTUALIZACION: '', FECHA_CADUCIDAD: '' },
  facturacion: { ID_FACTURA: '', ID_VENTA: '', ID_CLIENTE: '', FECHA_EMISION: '', FECHA_RECIBIDA: '', MONTO_PAGO: '' },
  detalleVentas: { ID_DETALLE: '', ID_VENTA: '', ID_PRODUCTO: '', PRECIO_UNITARIO: '', CANT_VENDIDA: '', SUBTOTAL: '', OBSERVACIONES: '' },
  horarioLaboral: { ID_HORARIO: '', ID_EMPLEADO: '', DIA: '', HORA_ENTRADA: '', HORA_SALIDA: '', TURNO: '' },
};

const fieldMeta = {
  empleados: {
    FECHA_INGRESO: { type: 'date' },
    PUESTO: { type: 'select', options: ['Barista', 'Cajero', 'Gerente', 'Repartidor', 'Limpieza'] },
    ESTADO: { type: 'select', options: ['Activo', 'Inactivo', 'Vacaciones', 'Baja'] },
    DEPARTAMENTO: { type: 'select', options: ['Cocina', 'Caja', 'Administración', 'Servicio'] },
    SALARIO: { type: 'number' },
  },
  ventas: {
    METODO_PAGO: { type: 'select', options: ['Efectivo', 'Tarjeta', 'Transferencia', 'QR'] },
    FECHA_VENTA: { type: 'datetime-local' },
    TOTAL: { type: 'number' },
  },
  facturacion: {
    FECHA_EMISION: { type: 'datetime-local' },
    FECHA_RECIBIDA: { type: 'datetime-local' },
    MONTO_PAGO: { type: 'number' },
  },
  inventario: {
    STOCK: { type: 'number' },
    ULTIMA_ACTUALIZACION: { type: 'datetime-local' },
    FECHA_CADUCIDAD: { type: 'date' },
  },
  detalleVentas: {
    PRECIO_UNITARIO: { type: 'number' },
    CANT_VENDIDA: { type: 'number' },
    SUBTOTAL: { type: 'number' },
    OBSERVACIONES: { type: 'textarea' },
  },
  productos: { PRECIO_VENTA: { type: 'number' } },
  usuarios: { FECHA_REG: { type: 'datetime-local' }, PASSWORD: { type: 'password' } },
  horarioLaboral: {
    DIA: { type: 'select', options: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'] },
    HORA_ENTRADA: { type: 'time' },
    HORA_SALIDA: { type: 'time' },
    TURNO: { type: 'select', options: ['Mañana', 'Tarde', 'Noche'] },
  },
};

function toLabel(key) {
  return key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function FormField({ name, value, tableKey, onChange }) {
  const meta = (fieldMeta[tableKey] && fieldMeta[tableKey][name]) || {};
  const type = meta.type || 'text';

  if (type === 'select') {
    return (
      <select name={name} value={value} onChange={onChange} className="hp-input">
        <option value="">Seleccionar...</option>
        {meta.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    );
  }
  if (type === 'textarea') {
    return <textarea name={name} value={value} onChange={onChange} className="hp-input hp-textarea" rows={3} placeholder={toLabel(name)} />;
  }
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="hp-input"
      placeholder={toLabel(name)}
    />
  );
}

function TableForm({ tableKey }) {
  const [form, setForm] = useState({ ...initialForms[tableKey] });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(`[${tableKey}]`, form);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  };

  const handleReset = () => {
    setForm({ ...initialForms[tableKey] });
  };

  return (
    <form className="hp-form" onSubmit={handleSubmit}>
      <div className="hp-fields-grid">
        {Object.keys(form).map(field => (
          <div key={field} className="hp-field-group">
            <label className="hp-label">{toLabel(field)}</label>
            <FormField name={field} value={form[field]} tableKey={tableKey} onChange={handleChange} />
          </div>
        ))}
      </div>
      <div className="hp-form-actions">
        <button type="button" className="hp-btn hp-btn-ghost" onClick={handleReset}>
          Limpiar
        </button>
        <button type="submit" className="hp-btn hp-btn-primary">
          {submitted ? '✓ Guardado' : 'Guardar Registro'}
        </button>
      </div>
      {submitted && <div className="hp-success-toast">✓ Registro guardado exitosamente</div>}
    </form>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('empleados');
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`hp-app ${darkMode ? 'hp-dark' : ''}`}>
      {/* Header */}
      <header className="hp-header">
        <div className="hp-header-inner">
          <div className="hp-logo">
            <span className="hp-logo-icon">☕</span>
            <div>
              <h1 className="hp-brand">HOTPOT</h1>
              <p className="hp-brand-sub">Sistema de Administración</p>
            </div>
          </div>
          <div className="hp-header-right">
            <button
              className="hp-theme-toggle"
              onClick={() => setDarkMode(d => !d)}
              title={darkMode ? 'Modo claro' : 'Modo oscuro'}
            >
              <span className="hp-theme-icon">{darkMode ? '☀️' : '🌙'}</span>
              <span className="hp-theme-label">{darkMode ? 'Claro' : 'Oscuro'}</span>
            </button>
            <div className="hp-header-badge">
              <span className="hp-dot" />
              Sistema Activo
            </div>
          </div>
        </div>
      </header>

      <div className="hp-layout">
        {/* Sidebar */}
        <nav className="hp-sidebar">
          <p className="hp-sidebar-title">Módulos</p>
          {TABLES.map(t => (
            <button
              key={t.key}
              className={`hp-nav-item ${activeTab === t.key ? 'hp-nav-item--active' : ''}`}
              onClick={() => setActiveTab(t.key)}
            >
              <span className="hp-nav-icon">{t.icon}</span>
              <span className="hp-nav-label">{t.label}</span>
            </button>
          ))}
        </nav>

        {/* Main Content */}
        <main className="hp-main">
          <div className="hp-section-header">
            <div className="hp-section-icon">
              {TABLES.find(t => t.key === activeTab)?.icon}
            </div>
            <div>
              <h2 className="hp-section-title">
                {TABLES.find(t => t.key === activeTab)?.label}
              </h2>
              <p className="hp-section-desc">Ingresa los datos del nuevo registro</p>
            </div>
          </div>
          <div className="hp-card">
            <TableForm key={activeTab} tableKey={activeTab} />
          </div>
        </main>
      </div>
    </div>
  );
}