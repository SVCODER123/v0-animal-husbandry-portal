-- Seed Government Schemes
INSERT INTO public.government_schemes (title, description, scheme_type, eligibility, benefits, subsidy_percentage, state, source, application_link) VALUES
('Pradhan Mantri Kisan Samman Nidhi', 'Direct income support to farmers', 'Income Support', 'All farmers', '₹6000 per year', 100, 'Maharashtra', 'Central Government', 'https://pmkisan.gov.in'),
('Maharashtra Godhan Vikas Mission', 'Promotion of dairy and animal husbandry', 'Livestock Development', 'Farmers with livestock', 'Cattle, equipment subsidies', 50, 'Maharashtra', 'State Government', 'https://dairy.maharashtra.gov.in'),
('Livestock Health Insurance Scheme', 'Insurance coverage for livestock', 'Insurance', 'Livestock owners', 'Coverage up to ₹50,000', 80, 'Maharashtra', 'State Government', 'https://insurance.maharashtra.gov.in'),
('Poultry Development Scheme', 'Support for poultry farming', 'Poultry', 'Aspiring poultry farmers', 'Birds, feed subsidies', 60, 'Maharashtra', 'State Government', 'https://poultry.maharashtra.gov.in'),
('Goat Rearing Subsidy Scheme', 'Financial assistance for goat farming', 'Goat Farming', 'Marginal farmers', 'Breeding animals, equipment', 70, 'Maharashtra', 'State Government', 'https://goat.maharashtra.gov.in');

-- Seed Livestock Prices
INSERT INTO public.livestock_prices (livestock_type, breed, price_per_unit, unit_type, location_district, market_name, trend) VALUES
('Cow', 'Holstein', 40000, 'per animal', 'Pune', 'Pune Central Market', 'stable'),
('Cow', 'Local Breed', 35000, 'per animal', 'Nagpur', 'Nagpur Market', 'increasing'),
('Goat', 'Sirohi', 8000, 'per animal', 'Nashik', 'Nashik Market', 'stable'),
('Goat', 'Boer', 12000, 'per animal', 'Aurangabad', 'Aurangabad Market', 'increasing'),
('Poultry', 'Broiler', 120, 'per bird', 'Pune', 'Pune Central Market', 'stable'),
('Poultry', 'Layer', 100, 'per bird', 'Mumbai', 'Mumbai Market', 'decreasing'),
('Buffalo', 'Murrah', 60000, 'per animal', 'Nashik', 'Nashik Market', 'stable');

-- Seed Veterinary Services
INSERT INTO public.veterinary_services (clinic_name, veterinarian_name, specialization, location_address, location_district, phone_number, email, services, availability_days, availability_hours) VALUES
('Pune Veterinary Clinic', 'Dr. Rajesh Sharma', 'Cattle & Dairy', '123 Market Street, Pune', 'Pune', '9876543210', 'pune.vet@example.com', 'Vaccination, Health Checkup, Surgery', 'Monday-Saturday', '10:00-18:00'),
('Nashik Animal Hospital', 'Dr. Priya Desai', 'Small Ruminants', '456 Main Road, Nashik', 'Nashik', '9876543211', 'nashik.vet@example.com', 'Goat Care, Breeding Consultation', 'Monday-Friday', '09:00-17:00'),
('Mumbai Poultry Care', 'Dr. Anil Kumar', 'Poultry', '789 Industrial Area, Mumbai', 'Mumbai', '9876543212', 'mumbai.poultry@example.com', 'Bird Vaccination, Disease Management', 'Daily', '08:00-20:00'),
('Aurangabad Livestock Center', 'Dr. Sunita Patel', 'General Livestock', '321 City Center, Aurangabad', 'Aurangabad', '9876543213', 'aurangabad.vet@example.com', 'All Livestock Services', 'Monday-Saturday', '10:00-18:00'),
('Nagpur Modern Veterinary', 'Dr. Vikram Singh', 'Emergency Services', '654 Emergency Road, Nagpur', 'Nagpur', '9876543214', 'nagpur.emergency@example.com', '24/7 Emergency, Surgery, Consultation', 'Daily', '24 hours');

-- Seed Training Workshops
INSERT INTO public.training_workshops (title, description, workshop_type, trainer_name, location_district, start_date, end_date, max_participants, duration_hours, fee, topics, registration_deadline) VALUES
('Modern Dairy Farming Techniques', 'Learn latest dairy management and milking technology', 'Dairy Farming', 'Mr. Ramesh Kulkarni', 'Pune', NOW() + INTERVAL '10 days', NOW() + INTERVAL '12 days', 30, 8, 500, 'Milking, Feed Management, Health Care', NOW() + INTERVAL '5 days'),
('Goat Rearing for Profit', 'Complete guide to profitable goat farming', 'Goat Farming', 'Mrs. Seema Singh', 'Nashik', NOW() + INTERVAL '15 days', NOW() + INTERVAL '17 days', 25, 6, 300, 'Breeding, Feed, Marketing', NOW() + INTERVAL '10 days'),
('Poultry Production Excellence', 'Advanced poultry farming and disease management', 'Poultry Farming', 'Dr. Anil Kumar', 'Mumbai', NOW() + INTERVAL '20 days', NOW() + INTERVAL '22 days', 40, 12, 800, 'Layer/Broiler Management, Vaccination', NOW() + INTERVAL '15 days'),
('Organic Livestock Farming', 'Sustainable and organic farming practices', 'Organic Farming', 'Mr. Deepak Sharma', 'Aurangabad', NOW() + INTERVAL '25 days', NOW() + INTERVAL '27 days', 35, 10, 600, 'Organic Feed, Natural Medicine', NOW() + INTERVAL '20 days'),
('AI in Animal Husbandry', 'Using AI for better herd management and productivity', 'Technology', 'Prof. Rajesh Gupta', 'Nagpur', NOW() + INTERVAL '30 days', NOW() + INTERVAL '31 days', 50, 4, 1000, 'Monitoring, Prediction, Data Analytics', NOW() + INTERVAL '25 days');
