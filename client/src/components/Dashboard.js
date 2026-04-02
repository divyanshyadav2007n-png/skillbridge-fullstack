import React from 'react';

const Dashboard = () => {
    // 1. User data fetching from local storage
    const user = JSON.parse(localStorage.getItem('user'));
    
    // 2. State for application counter
    const [appliedCount, setAppliedCount] = React.useState(0);

    // 3. Fetch applications count from backend on load
    React.useEffect(() => {
        const fetchApps = async () => {
            if (user?._id) {
                try {
                    const res = await fetch(`http://localhost:5001/api/my-applications/${user._id}`);
                    const data = await res.json();
                    if (Array.isArray(data)) setAppliedCount(data.length);
                } catch (err) {
                    console.log("Error fetching count:", err);
                }
            }
        };
        fetchApps();
    }, [user?._id]);

    // 4. Logout Functionality
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/login';
    };

    // 5. Internship Apply Logic
    const handleApply = async (title, company) => {
        if (!user || !user._id) {
            alert("Session expired. Please login again.");
            return;
        }

        try {
            const response = await fetch('http://localhost:5001/api/apply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user._id,
                    internshipTitle: title,
                    company: company
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert(`✅ Success: Applied for ${title}`);
                setAppliedCount(prev => prev + 1); // Counter update
            } else {
                alert(`❌ ${data.message}`);
            }
        } catch (error) {
            alert("Server not responding. Check if backend is running!");
        }
    };

    // 6. Dummy Internship Data
    const internships = [
        { id: 1, title: "Full Stack Developer", company: "Lucknow Tech Solutions", duration: "3 Months", stipend: "₹8,000", location: "Remote" },
        { id: 2, title: "Frontend Intern (React)", company: "Digital Spark", duration: "6 Months", stipend: "₹12,000", location: "Office" },
        { id: 3, title: "UI/UX Designer", company: "Creative Minds", duration: "2 Months", stipend: "Unpaid", location: "Remote" }
    ];

    // --- Inline Styles ---
    const sidebarStyle = { width: '250px', backgroundColor: '#2c3e50', color: 'white', padding: '25px 15px', display: 'flex', flexDirection: 'column', position: 'fixed', height: '100vh' };
    const menuItemStyle = { padding: '12px 15px', cursor: 'pointer', borderRadius: '8px', marginBottom: '8px', fontSize: '15px', color: '#ecf0f1' };
    const cardStyle = { backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', border: '1px solid #eee' };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f7f6', fontFamily: 'Arial' }}>
            
            {/* SIDEBAR */}
            <div style={sidebarStyle}>
                <h2 style={{ textAlign: 'center', color: '#3498db', marginBottom: '30px' }}>InternHub</h2>
                <nav style={{ flex: 1 }}>
                    <div style={{ ...menuItemStyle, backgroundColor: '#34495e' }}>🏠 Dashboard</div>
                    <div style={menuItemStyle}>💼 Browse Jobs</div>
                    <div style={menuItemStyle}>📄 My Applications</div>
                    <div style={menuItemStyle}>👤 Profile</div>
                </nav>
                <button onClick={handleLogout} style={{ padding: '12px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Logout
                </button>
            </div>

            {/* MAIN CONTENT */}
            <div style={{ flex: 1, marginLeft: '250px', display: 'flex', flexDirection: 'column' }}>
                
                {/* Header */}
                <header style={{ height: '70px', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ color: '#333' }}>Student Panel</h3>
                    <div style={{ fontWeight: '500' }}>
                        Welcome, <span style={{ color: '#3498db' }}>{user?.name || 'User'}</span>! 👋
                    </div>
                </header>

                {/* Main View */}
                <main style={{ padding: '40px' }}>
                    <h2 style={{ marginBottom: '25px', color: '#2c3e50' }}>Overview</h2>
                    
                    {/* Stats Section */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                        <div style={cardStyle}>
                            <h4 style={{ color: '#7f8c8d', margin: '0 0 10px 0' }}>User Profile</h4>
                            <p style={{ margin: '5px 0' }}><strong>Email:</strong> {user?.email}</p>
                            <p style={{ margin: '5px 0' }}><strong>Role:</strong> {user?.role}</p>
                        </div>
                        <div style={{ ...cardStyle, borderLeft: '5px solid #3498db' }}>
                            <h4 style={{ color: '#7f8c8d', margin: '0 0 10px 0' }}>Applied Jobs</h4>
                            <h2 style={{ margin: 0 }}>{appliedCount}</h2>
                        </div>
                    </div>

                    {/* Internship Listings */}
                    <h3 style={{ marginBottom: '20px', color: '#333' }}>Recommended Internships</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {internships.map((intern) => (
                            <div key={intern.id} style={{ ...cardStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h4 style={{ margin: 0, color: '#2c3e50', fontSize: '18px' }}>{intern.title}</h4>
                                    <p style={{ margin: '5px 0', color: '#7f8c8d' }}>{intern.company} • {intern.location}</p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', color: '#27ae60' }}>{intern.stipend}</p>
                                    <button 
                                        style={{ padding: '8px 20px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                                        onClick={() => handleApply(intern.title, intern.company)}
                                    >
                                        Apply Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;