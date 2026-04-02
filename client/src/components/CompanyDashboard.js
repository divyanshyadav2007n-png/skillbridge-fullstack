import React, { useState, useEffect } from 'react';

const CompanyDashboard = () => {
    // 1. User data aur applications ke liye state
    const user = JSON.parse(localStorage.getItem('user'));
    const [apps, setApps] = useState([]);

    // 2. Applications fetch karne ka logic
    useEffect(() => {
        const fetchCompanyApps = async () => {
            if (user?.name) {
                try {
                    const res = await fetch(`http://localhost:5001/api/company-applications/${user.name}`);
                    const data = await res.json();
                    if (Array.isArray(data)) {
                        setApps(data);
                    }
                } catch (err) {
                    console.error("Error fetching data:", err);
                }
            }
        };
        fetchCompanyApps();
    }, [user?.name]);

    // 3. Logout function
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/login';
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f7f6', fontFamily: 'Arial' }}>
            
            {/* --- SIDEBAR --- */}
            <div style={{ 
                width: '250px', 
                backgroundColor: '#2c3e50', 
                color: 'white', 
                padding: '25px 15px', 
                display: 'flex', 
                flexDirection: 'column', 
                position: 'fixed', 
                height: '100vh',
                boxSizing: 'border-box'
            }}>
                <h2 style={{ textAlign: 'center', color: '#3498db', marginBottom: '30px' }}>InternHub</h2>
                
                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '12px 15px', cursor: 'pointer', borderRadius: '8px', marginBottom: '8px', backgroundColor: '#34495e' }}>📊 Overview</div>
                    <div style={{ padding: '12px 15px', cursor: 'pointer', borderRadius: '8px', marginBottom: '8px', color: '#ecf0f1' }}>📝 Post Internship</div>
                    <div style={{ padding: '12px 15px', cursor: 'pointer', borderRadius: '8px', marginBottom: '8px', color: '#ecf0f1' }}>👥 Applicants</div>

                    {/* Logout Button Fixed at Bottom */}
                    <div style={{ marginTop: 'auto', paddingBottom: '20px' }}>
                        <button 
                            onClick={handleLogout} 
                            style={{ 
                                width: '100%',
                                padding: '12px', 
                                backgroundColor: '#e74c3c', 
                                color: 'white', 
                                border: 'none', 
                                borderRadius: '8px', 
                                cursor: 'pointer', 
                                fontWeight: 'bold' 
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </nav>
            </div>

            {/* --- MAIN CONTENT --- */}
            <div style={{ flex: 1, marginLeft: '250px', padding: '40px' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <h2 style={{ color: '#2c3e50', margin: 0 }}>Company Dashboard</h2>
                    <div style={{ fontWeight: '500' }}>
                        Logged in as: <span style={{ color: '#3498db' }}>{user?.name}</span>
                    </div>
                </header>

                {/* Stats Card */}
                <div style={{ 
                    backgroundColor: 'white', 
                    padding: '20px', 
                    borderRadius: '12px', 
                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)', 
                    marginBottom: '30px', 
                    borderLeft: '5px solid #27ae60',
                    width: 'fit-content',
                    minWidth: '250px'
                }}>
                    <p style={{ color: '#7f8c8d', margin: '0 0 5px 0' }}>Total Applications Received</p>
                    <h2 style={{ margin: 0, fontSize: '28px' }}>{apps.length}</h2>
                </div>

                {/* Table */}
                <h3 style={{ marginBottom: '20px', color: '#333' }}>Recent Applicants</h3>
                <div style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#ecf0f1', textAlign: 'left' }}>
                                <th style={{ padding: '15px' }}>Student Email</th>
                                <th style={{ padding: '15px' }}>Role</th>
                                <th style={{ padding: '15px' }}>Status</th>
                                <th style={{ padding: '15px' }}>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {apps.length > 0 ? apps.map((app, index) => (
                                <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '15px' }}>{app.userId}</td>
                                    <td style={{ padding: '15px', fontWeight: 'bold' }}>{app.internshipTitle}</td>
                                    <td style={{ padding: '15px' }}>
                                        <span style={{ backgroundColor: '#e1f5fe', color: '#0288d1', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
                                            {app.status || 'Pending'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '15px', color: '#7f8c8d' }}>
                                        {new Date(app.appliedAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" style={{ padding: '40px', textAlign: 'center', color: '#95a5a6' }}>
                                        Abhi tak koi application nahi aayi hai.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CompanyDashboard;