import React, { useEffect, useState } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { getAllEmployees } from '../services/employeeService';
import { getAllDepartments } from '../services/departmentService';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  CircularProgress,
  useTheme,
} from '@mui/material';
import { People, Business, CalendarMonth, Work, TrendingUp } from '@mui/icons-material';

Chart.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  const theme = useTheme();

  const [employeeCount, setEmployeeCount] = useState(0);
  const [departmentCount, setDepartmentCount] = useState(0);
  const [averageAge, setAverageAge] = useState(0);
  const [employeeGrowth, setEmployeeGrowth] = useState([]);
  const [ageRangeData, setAgeRangeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genderData] = useState({ male: 175, female: 120 });
  const [jobSatisfactionData] = useState({ satisfied: 215, neutral: 50, dissatisfied: 30 });
  const [remoteWorkData] = useState({ onsite: 145, remote: 70, hybrid: 80 });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const employees = await getAllEmployees();
      const departments = await getAllDepartments();
      setEmployeeCount(employees.length);
      setDepartmentCount(departments.length);

      const totalAge = employees.reduce((sum, emp) => sum + emp.age, 0);
      const avgAge = employees.length ? totalAge / employees.length : 0;
      setAverageAge(avgAge.toFixed(1));

      const ageRanges = {
        '20-29': 0,
        '30-39': 0,
        '40-49': 0,
        '50-59': 0,
        '60+': 0,
      };

      employees.forEach((emp) => {
        if (emp.age >= 20 && emp.age <= 29) ageRanges['20-29'] += 1;
        else if (emp.age >= 30 && emp.age <= 39) ageRanges['30-39'] += 1;
        else if (emp.age >= 40 && emp.age <= 49) ageRanges['40-49'] += 1;
        else if (emp.age >= 50 && emp.age <= 59) ageRanges['50-59'] += 1;
        else if (emp.age >= 60) ageRanges['60+'] += 1;
      });

      setAgeRangeData(ageRanges);
      setEmployeeGrowth([
        { month: 'January', count: 50 },
        { month: 'February', count: 70 },
        { month: 'March', count: 100 },
        { month: 'April', count: 130 },
        { month: 'May', count: 160 },
        { month: 'June', count: 200 },
      ]);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Chart configurations
  const totalOverviewData = {
    labels: ['Employees', 'Departments'],
    datasets: [
      {
        label: 'Total Count',
        data: [employeeCount, departmentCount],
        backgroundColor: ['#3B82F6', '#8B5CF6'],
        borderWidth: 1,
      },
    ],
  };

  const genderChartData = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        label: 'Gender',
        data: [genderData.male, genderData.female],
        backgroundColor: ['#3B82F6', '#EC4899'],
      },
    ],
  };

  const jobSatisfactionChartData = {
    labels: ['Satisfied', 'Neutral', 'Dissatisfied'],
    datasets: [
      {
        label: 'Satisfaction',
        data: [jobSatisfactionData.satisfied, jobSatisfactionData.neutral, jobSatisfactionData.dissatisfied],
        backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
      },
    ],
  };

  const remoteWorkChartData = {
    labels: ['Onsite', 'Remote', 'Hybrid'],
    datasets: [
      {
        label: 'Work Mode',
        data: [remoteWorkData.onsite, remoteWorkData.remote, remoteWorkData.hybrid],
        backgroundColor: ['#6366F1', '#8B5CF6', '#EC4899'],
      },
    ],
  };

  const ageRangeChartData = {
    labels: Object.keys(ageRangeData),
    datasets: [
      {
        label: 'Age Ranges',
        data: Object.values(ageRangeData),
        backgroundColor: ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981'],
      },
    ],
  };

  const employeeGrowthData = {
    labels: employeeGrowth.map((d) => d.month),
    datasets: [
      {
        label: 'Employee Growth',
        data: employeeGrowth.map((d) => d.count),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ fontWeight: 700, textAlign: 'center', mb: 4, color: '#111827' }}>
        Employee Analytics Dashboard
      </Typography>

      {/* Metric Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { label: 'Total Employees', value: employeeCount, icon: <People sx={{ color: '#3B82F6' }} />, color: '#DBEAFE' },
          { label: 'Departments', value: departmentCount, icon: <Business sx={{ color: '#8B5CF6' }} />, color: '#EDE9FE' },
          { label: 'Average Age', value: `${averageAge}`, icon: <CalendarMonth sx={{ color: '#EC4899' }} />, color: '#FCE7F3' },
          { label: 'Satisfaction', value: '72.9%', icon: <Work sx={{ color: '#10B981' }} />, color: '#D1FAE5' },
        ].map((stat, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                transition: 'all 0.3s',
                backgroundColor: stat.color,
                '&:hover': { boxShadow: 6, transform: 'translateY(-5px)' },
              }}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <Box display="flex" justifyContent="center" alignItems="center" mb={1}>
                  {stat.icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {stat.label}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#111827' }}>
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3}>
        {/* Employee Growth */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: 4, p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Employee Growth Trend
            </Typography>
            <Line data={employeeGrowthData} />
          </Card>
        </Grid>

        {/* Age Distribution */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: 4, p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Age Range Distribution
            </Typography>
            <Bar data={ageRangeChartData} />
          </Card>
        </Grid>

        {/* Gender Distribution */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, boxShadow: 4, p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Gender Distribution
            </Typography>
            <Pie data={genderChartData} />
          </Card>
        </Grid>

        {/* Job Satisfaction */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, boxShadow: 4, p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Job Satisfaction
            </Typography>
            <Pie data={jobSatisfactionChartData} />
          </Card>
        </Grid>

        {/* Work Preference */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, boxShadow: 4, p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Work Mode Preference
            </Typography>
            <Pie data={remoteWorkChartData} />
          </Card>
        </Grid>

        {/* Total Overview */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: 4, p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Total Overview
            </Typography>
            <Bar data={totalOverviewData} />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
