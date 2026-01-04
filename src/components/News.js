// src/components/News.js
import React, { useEffect, useState, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

// Mock news data for fallback when API is unavailable
const getMockNews = (category, country, count = 9) => {
  const countryData = {
    us: {
      name: "United States",
      general: [
        "White House Announces New Economic Policy Initiatives",
        "Congress Passes Landmark Infrastructure Bill",
        "Supreme Court Hears Major Constitutional Case",
        "Federal Reserve Adjusts Interest Rates",
        "Tech Giants Face New Regulatory Scrutiny",
        "Education Department Launches National Program",
        "Climate Action Plan Gains Bipartisan Support",
        "Healthcare Reform Bill Advances in Senate",
        "Immigration Policy Changes Take Effect"
      ],
      business: [
        "Wall Street Reaches Record Highs Amid Economic Growth",
        "Silicon Valley Startups Secure Billions in Funding",
        "Major Retailers Expand E-commerce Operations",
        "Energy Sector Sees Renewable Investment Surge",
        "Automotive Industry Shifts to Electric Vehicles",
        "Banking Sector Reports Strong Quarterly Earnings",
        "Real Estate Market Shows Signs of Stabilization",
        "Manufacturing Jobs Return to Midwest States",
        "Tech IPOs Generate Investor Excitement"
      ],
      entertainment: [
        "Hollywood Awards Season Kicks Off with Major Premiere",
        "Streaming Services Battle for Subscriber Dominance",
        "Music Industry Celebrates Record-Breaking Album Sales",
        "Broadway Shows Return to Full Capacity",
        "Celebrity Charity Gala Raises Millions",
        "Film Festival Showcases Independent Cinema",
        "Gaming Industry Announces Blockbuster Releases",
        "Podcast Network Expands Original Content",
        "Sports Entertainment Breaks Viewership Records"
      ],
      sports: [
        "Super Bowl Sets New Television Ratings Record",
        "NBA Playoffs Enter Championship Round",
        "MLB Season Opens with Historic Performances",
        "NFL Draft Attracts Millions of Viewers",
        "College Football Championship Draws Massive Crowd",
        "Olympic Athletes Prepare for International Competition",
        "Golf Tournament Features Top Players",
        "Tennis Grand Slam Tournament Begins",
        "Soccer League Announces Expansion Plans"
      ],
      technology: [
        "Silicon Valley Tech Giants Announce AI Breakthroughs",
        "Startup Ecosystem Sees Unprecedented Investment",
        "5G Networks Expand Across Major Cities",
        "Cybersecurity Firms Warn of New Threats",
        "Cloud Computing Services Transform Business",
        "Electric Vehicle Technology Advances Rapidly",
        "Space Exploration Company Launches Mission",
        "Biotech Companies Develop New Treatments",
        "Quantum Computing Research Shows Promise"
      ],
      health: [
        "CDC Releases Updated Health Guidelines",
        "Medical Research Uncovers Treatment Breakthroughs",
        "Mental Health Awareness Campaign Launches Nationwide",
        "Telemedicine Services Expand Access to Care",
        "Pharmaceutical Companies Develop New Medications",
        "Public Health Initiatives Reduce Disease Rates",
        "Fitness Technology Helps Millions Stay Active",
        "Healthcare Systems Adopt Digital Solutions",
        "Nutrition Programs Improve Community Health"
      ],
      science: [
        "NASA Mission Discovers New Exoplanets",
        "Climate Scientists Publish Groundbreaking Research",
        "Renewable Energy Technology Reaches Milestone",
        "Marine Biology Study Reveals Ocean Discoveries",
        "Physics Experiment Confirms Theoretical Predictions",
        "Archaeological Discovery Rewrites History",
        "Genetics Research Advances Disease Understanding",
        "Astronomy Observatory Captures Stunning Images",
        "Environmental Science Study Highlights Conservation"
      ]
    },
    in: {
      name: "India",
      general: [
        "Prime Minister Announces New Development Initiatives",
        "Parliament Passes Key Economic Reform Bill",
        "Supreme Court Delivers Landmark Judgment",
        "RBI Adjusts Monetary Policy Rates",
        "Digital India Program Expands Nationwide",
        "Education Sector Sees Major Reforms",
        "Climate Action Plan Gains Momentum",
        "Healthcare Infrastructure Receives Boost",
        "Infrastructure Projects Transform Cities"
      ],
      business: [
        "Stock Markets Reach All-Time Highs",
        "Startup Ecosystem Attracts Record Investment",
        "E-commerce Giants Expand Operations",
        "Renewable Energy Sector Sees Growth",
        "IT Industry Reports Strong Performance",
        "Banking Sector Launches Digital Services",
        "Real Estate Market Shows Recovery",
        "Manufacturing Sector Expands Operations",
        "Foreign Investment Reaches New Heights"
      ],
      entertainment: [
        "Bollywood Releases Blockbuster Film",
        "Music Industry Celebrates Chart Success",
        "Streaming Platforms Launch Original Content",
        "Television Shows Break Viewership Records",
        "Film Festival Showcases Regional Cinema",
        "Celebrity Events Draw Massive Crowds",
        "Gaming Industry Sees Rapid Growth",
        "Podcast Culture Gains Popularity",
        "Sports Entertainment Captivates Audiences"
      ],
      sports: [
        "Cricket Team Wins International Championship",
        "IPL Season Breaks Viewership Records",
        "Olympic Athletes Bring Home Medals",
        "Football League Attracts Global Attention",
        "Badminton Players Excel in Competition",
        "Hockey Team Prepares for World Cup",
        "Athletics Championships Showcase Talent",
        "Kabaddi League Gains Popularity",
        "Sports Infrastructure Development Accelerates"
      ],
      technology: [
        "IT Companies Announce Major Expansions",
        "Startup Ecosystem Receives Record Funding",
        "5G Networks Launch in Major Cities",
        "Digital Payment Systems Transform Economy",
        "AI Research Centers Establish Operations",
        "Space Program Achieves New Milestone",
        "Cybersecurity Firms Expand Services",
        "Cloud Computing Adoption Increases",
        "Tech Education Programs Train Thousands"
      ],
      health: [
        "Health Ministry Launches New Initiative",
        "Medical Research Shows Promising Results",
        "Ayurveda Gains International Recognition",
        "Telemedicine Services Reach Rural Areas",
        "Vaccination Programs Achieve Success",
        "Public Health Campaigns Raise Awareness",
        "Hospital Infrastructure Modernizes",
        "Mental Health Services Expand Access",
        "Nutrition Programs Improve Outcomes"
      ],
      science: [
        "ISRO Mission Achieves Historic Milestone",
        "Climate Research Highlights Regional Impact",
        "Renewable Energy Projects Expand",
        "Marine Research Discovers New Species",
        "Physics Research Gains International Recognition",
        "Archaeological Findings Reveal Ancient History",
        "Genetics Research Advances Medical Science",
        "Astronomy Observatory Makes Discoveries",
        "Environmental Conservation Programs Succeed"
      ]
    },
    gb: {
      name: "United Kingdom",
      general: [
        "Prime Minister Announces Policy Reforms",
        "Parliament Debates Key Legislation",
        "Supreme Court Delivers Important Ruling",
        "Bank of England Adjusts Interest Rates",
        "Brexit Trade Agreements Take Effect",
        "Education System Undergoes Reforms",
        "Climate Action Plan Gains Support",
        "NHS Receives Additional Funding",
        "Infrastructure Projects Transform Regions"
      ],
      business: [
        "London Stock Exchange Reaches New Highs",
        "Tech Sector Attracts International Investment",
        "Financial Services Industry Expands",
        "Renewable Energy Sector Grows",
        "Retail Industry Adapts to Digital Trends",
        "Banking Sector Reports Strong Results",
        "Real Estate Market Shows Stability",
        "Manufacturing Sector Sees Growth",
        "Startup Ecosystem Thrives"
      ],
      entertainment: [
        "British Film Industry Celebrates Awards",
        "Music Scene Produces Chart-Topping Hits",
        "Streaming Services Launch UK Content",
        "Television Shows Gain Global Recognition",
        "Theatre Scene Returns to Full Capacity",
        "Celebrity Events Draw International Attention",
        "Gaming Industry Expands Operations",
        "Podcast Culture Flourishes",
        "Sports Entertainment Breaks Records"
      ],
      sports: [
        "Premier League Season Reaches Climax",
        "Cricket Team Prepares for International Series",
        "Olympic Athletes Win Medals",
        "Rugby Championship Attracts Viewers",
        "Tennis Tournament Features Top Players",
        "Golf Championship Draws Global Audience",
        "Athletics Competition Showcases Talent",
        "Football Team Qualifies for Tournament",
        "Sports Infrastructure Modernizes"
      ],
      technology: [
        "Tech Companies Establish UK Operations",
        "AI Research Centers Make Breakthroughs",
        "5G Networks Expand Coverage",
        "Cybersecurity Firms Warn of Threats",
        "Fintech Sector Sees Rapid Growth",
        "Space Industry Receives Investment",
        "Cloud Computing Adoption Increases",
        "Biotech Companies Develop Innovations",
        "Quantum Computing Research Advances"
      ],
      health: [
        "NHS Launches New Health Initiative",
        "Medical Research Achieves Breakthroughs",
        "Mental Health Services Expand",
        "Telemedicine Adoption Increases",
        "Vaccination Programs Show Success",
        "Public Health Campaigns Raise Awareness",
        "Hospital Services Modernize",
        "Pharmaceutical Research Develops Treatments",
        "Health Technology Improves Care"
      ],
      science: [
        "UK Space Agency Mission Succeeds",
        "Climate Research Publishes Findings",
        "Renewable Energy Projects Expand",
        "Marine Research Makes Discoveries",
        "Physics Research Confirms Theories",
        "Archaeological Findings Reveal History",
        "Genetics Research Advances Medicine",
        "Astronomy Observatory Captures Images",
        "Environmental Programs Succeed"
      ]
    },
    ca: {
      name: "Canada",
      general: [
        "Prime Minister Announces New Policies",
        "Parliament Passes Key Legislation",
        "Supreme Court Issues Important Ruling",
        "Bank of Canada Adjusts Rates",
        "Trade Agreements Strengthen Economy",
        "Education System Receives Funding",
        "Climate Action Plan Advances",
        "Healthcare System Expands Services",
        "Infrastructure Projects Transform Cities"
      ],
      business: [
        "Toronto Stock Exchange Reaches Highs",
        "Tech Sector Attracts Investment",
        "Natural Resources Industry Expands",
        "Renewable Energy Sector Grows",
        "Banking Sector Reports Growth",
        "Real Estate Market Shows Stability",
        "Manufacturing Sector Expands",
        "Startup Ecosystem Thrives",
        "Foreign Investment Increases"
      ],
      entertainment: [
        "Canadian Film Industry Celebrates Success",
        "Music Scene Produces International Hits",
        "Streaming Platforms Launch Canadian Content",
        "Television Shows Gain Recognition",
        "Film Festival Showcases Talent",
        "Celebrity Events Draw Attention",
        "Gaming Industry Expands",
        "Podcast Culture Grows",
        "Sports Entertainment Breaks Records"
      ],
      sports: [
        "NHL Season Reaches Playoffs",
        "Olympic Athletes Win Medals",
        "Basketball League Attracts Fans",
        "Soccer League Expands",
        "Curling Championship Draws Viewers",
        "Hockey Team Prepares for Competition",
        "Athletics Competition Showcases Talent",
        "Winter Sports Gain Popularity",
        "Sports Infrastructure Modernizes"
      ],
      technology: [
        "Tech Companies Expand Canadian Operations",
        "AI Research Centers Make Progress",
        "5G Networks Launch in Cities",
        "Cybersecurity Firms Expand Services",
        "Fintech Sector Grows",
        "Space Industry Receives Support",
        "Cloud Computing Adoption Increases",
        "Biotech Companies Develop Innovations",
        "Quantum Computing Research Advances"
      ],
      health: [
        "Health Ministry Launches Initiative",
        "Medical Research Achieves Results",
        "Mental Health Services Expand",
        "Telemedicine Adoption Grows",
        "Vaccination Programs Succeed",
        "Public Health Campaigns Raise Awareness",
        "Hospital Services Improve",
        "Pharmaceutical Research Develops Treatments",
        "Health Technology Enhances Care"
      ],
      science: [
        "Canadian Space Agency Mission Succeeds",
        "Climate Research Publishes Studies",
        "Renewable Energy Projects Expand",
        "Marine Research Makes Discoveries",
        "Physics Research Confirms Predictions",
        "Archaeological Findings Reveal History",
        "Genetics Research Advances Medicine",
        "Astronomy Observatory Makes Discoveries",
        "Environmental Programs Succeed"
      ]
    },
    au: {
      name: "Australia",
      general: [
        "Prime Minister Announces Policy Changes",
        "Parliament Debates Key Issues",
        "High Court Delivers Ruling",
        "Reserve Bank Adjusts Rates",
        "Trade Relations Strengthen",
        "Education Sector Receives Funding",
        "Climate Action Plan Advances",
        "Healthcare System Expands",
        "Infrastructure Projects Transform"
      ],
      business: [
        "ASX Reaches Record Highs",
        "Mining Industry Sees Growth",
        "Tech Sector Attracts Investment",
        "Renewable Energy Expands",
        "Banking Sector Reports Success",
        "Real Estate Market Stabilizes",
        "Tourism Industry Recovers",
        "Agriculture Sector Expands",
        "Startup Ecosystem Grows"
      ],
      entertainment: [
        "Australian Film Industry Celebrates",
        "Music Scene Produces Hits",
        "Streaming Services Launch Content",
        "Television Shows Gain Recognition",
        "Film Festival Showcases Talent",
        "Celebrity Events Draw Crowds",
        "Gaming Industry Expands",
        "Podcast Culture Flourishes",
        "Sports Entertainment Thrives"
      ],
      sports: [
        "Cricket Team Wins Series",
        "AFL Season Reaches Finals",
        "Olympic Athletes Excel",
        "Rugby League Attracts Fans",
        "Tennis Tournament Features Stars",
        "Swimming Competition Breaks Records",
        "Surfing Championship Draws Viewers",
        "Athletics Showcases Talent",
        "Sports Infrastructure Modernizes"
      ],
      technology: [
        "Tech Companies Expand Operations",
        "AI Research Makes Progress",
        "5G Networks Launch",
        "Cybersecurity Firms Expand",
        "Fintech Sector Grows",
        "Space Industry Receives Support",
        "Cloud Computing Adoption Increases",
        "Biotech Companies Innovate",
        "Quantum Research Advances"
      ],
      health: [
        "Health Department Launches Initiative",
        "Medical Research Achieves Results",
        "Mental Health Services Expand",
        "Telemedicine Adoption Grows",
        "Vaccination Programs Succeed",
        "Public Health Campaigns Raise Awareness",
        "Hospital Services Improve",
        "Pharmaceutical Research Develops",
        "Health Technology Enhances Care"
      ],
      science: [
        "Space Agency Mission Succeeds",
        "Climate Research Publishes Findings",
        "Renewable Energy Projects Expand",
        "Marine Research Makes Discoveries",
        "Physics Research Confirms Theories",
        "Archaeological Findings Reveal History",
        "Genetics Research Advances",
        "Astronomy Observatory Discovers",
        "Environmental Programs Succeed"
      ]
    },
    de: {
      name: "Germany",
      general: [
        "Chancellor Announces Policy Reforms",
        "Bundestag Passes Key Legislation",
        "Constitutional Court Issues Ruling",
        "ECB Adjusts Monetary Policy",
        "EU Relations Strengthen",
        "Education System Receives Funding",
        "Climate Action Plan Advances",
        "Healthcare System Expands",
        "Infrastructure Projects Transform"
      ],
      business: [
        "DAX Reaches New Highs",
        "Automotive Industry Expands",
        "Tech Sector Attracts Investment",
        "Renewable Energy Sector Grows",
        "Banking Sector Reports Growth",
        "Manufacturing Industry Thrives",
        "Real Estate Market Stabilizes",
        "Startup Ecosystem Expands",
        "Foreign Investment Increases"
      ],
      entertainment: [
        "German Film Industry Celebrates",
        "Music Scene Produces International Hits",
        "Streaming Services Launch Content",
        "Television Shows Gain Recognition",
        "Film Festival Showcases Talent",
        "Celebrity Events Draw Attention",
        "Gaming Industry Expands",
        "Podcast Culture Grows",
        "Sports Entertainment Thrives"
      ],
      sports: [
        "Bundesliga Season Reaches Climax",
        "Olympic Athletes Win Medals",
        "Formula One Race Attracts Fans",
        "Tennis Tournament Features Stars",
        "Basketball League Expands",
        "Athletics Competition Showcases Talent",
        "Football Team Qualifies",
        "Winter Sports Gain Popularity",
        "Sports Infrastructure Modernizes"
      ],
      technology: [
        "Tech Companies Expand Operations",
        "AI Research Centers Make Progress",
        "5G Networks Launch",
        "Cybersecurity Firms Expand",
        "Automotive Tech Advances",
        "Space Industry Receives Support",
        "Cloud Computing Adoption Increases",
        "Biotech Companies Innovate",
        "Quantum Research Advances"
      ],
      health: [
        "Health Ministry Launches Initiative",
        "Medical Research Achieves Breakthroughs",
        "Mental Health Services Expand",
        "Telemedicine Adoption Grows",
        "Vaccination Programs Succeed",
        "Public Health Campaigns Raise Awareness",
        "Hospital Services Improve",
        "Pharmaceutical Research Develops",
        "Health Technology Enhances Care"
      ],
      science: [
        "Space Agency Mission Succeeds",
        "Climate Research Publishes Findings",
        "Renewable Energy Projects Expand",
        "Marine Research Makes Discoveries",
        "Physics Research Confirms Theories",
        "Archaeological Findings Reveal History",
        "Genetics Research Advances",
        "Astronomy Observatory Discovers",
        "Environmental Programs Succeed"
      ]
    },
    fr: {
      name: "France",
      general: [
        "President Announces Policy Changes",
        "Parliament Passes Legislation",
        "Constitutional Council Issues Ruling",
        "ECB Adjusts Policy",
        "EU Relations Strengthen",
        "Education System Receives Funding",
        "Climate Action Plan Advances",
        "Healthcare System Expands",
        "Infrastructure Projects Transform"
      ],
      business: [
        "CAC 40 Reaches Highs",
        "Luxury Industry Expands",
        "Tech Sector Attracts Investment",
        "Renewable Energy Grows",
        "Banking Sector Reports Growth",
        "Tourism Industry Recovers",
        "Real Estate Market Stabilizes",
        "Startup Ecosystem Thrives",
        "Foreign Investment Increases"
      ],
      entertainment: [
        "French Film Industry Celebrates",
        "Music Scene Produces Hits",
        "Streaming Services Launch Content",
        "Television Shows Gain Recognition",
        "Cannes Film Festival Showcases",
        "Celebrity Events Draw Attention",
        "Gaming Industry Expands",
        "Podcast Culture Grows",
        "Sports Entertainment Thrives"
      ],
      sports: [
        "Ligue 1 Season Reaches Climax",
        "Olympic Athletes Win Medals",
        "Tour de France Attracts Fans",
        "Tennis Tournament Features Stars",
        "Rugby Championship Draws Viewers",
        "Athletics Competition Showcases",
        "Football Team Qualifies",
        "Winter Sports Gain Popularity",
        "Sports Infrastructure Modernizes"
      ],
      technology: [
        "Tech Companies Expand Operations",
        "AI Research Makes Progress",
        "5G Networks Launch",
        "Cybersecurity Firms Expand",
        "Fintech Sector Grows",
        "Space Industry Receives Support",
        "Cloud Computing Adoption Increases",
        "Biotech Companies Innovate",
        "Quantum Research Advances"
      ],
      health: [
        "Health Ministry Launches Initiative",
        "Medical Research Achieves Results",
        "Mental Health Services Expand",
        "Telemedicine Adoption Grows",
        "Vaccination Programs Succeed",
        "Public Health Campaigns Raise Awareness",
        "Hospital Services Improve",
        "Pharmaceutical Research Develops",
        "Health Technology Enhances Care"
      ],
      science: [
        "Space Agency Mission Succeeds",
        "Climate Research Publishes Findings",
        "Renewable Energy Projects Expand",
        "Marine Research Makes Discoveries",
        "Physics Research Confirms Theories",
        "Archaeological Findings Reveal History",
        "Genetics Research Advances",
        "Astronomy Observatory Discovers",
        "Environmental Programs Succeed"
      ]
    },
    jp: {
      name: "Japan",
      general: [
        "Prime Minister Announces Reforms",
        "Diet Passes Key Legislation",
        "Supreme Court Issues Ruling",
        "Bank of Japan Adjusts Policy",
        "Trade Relations Strengthen",
        "Education System Receives Funding",
        "Climate Action Plan Advances",
        "Healthcare System Expands",
        "Infrastructure Projects Transform"
      ],
      business: [
        "Nikkei Reaches Highs",
        "Tech Sector Attracts Investment",
        "Automotive Industry Expands",
        "Renewable Energy Grows",
        "Banking Sector Reports Growth",
        "Manufacturing Industry Thrives",
        "Real Estate Market Stabilizes",
        "Startup Ecosystem Expands",
        "Foreign Investment Increases"
      ],
      entertainment: [
        "Japanese Film Industry Celebrates",
        "Music Scene Produces Hits",
        "Anime Industry Expands Globally",
        "Streaming Services Launch Content",
        "Television Shows Gain Recognition",
        "Film Festival Showcases Talent",
        "Gaming Industry Expands",
        "Podcast Culture Grows",
        "Sports Entertainment Thrives"
      ],
      sports: [
        "J-League Season Reaches Climax",
        "Olympic Athletes Win Medals",
        "Baseball League Attracts Fans",
        "Sumo Tournament Draws Viewers",
        "Tennis Tournament Features Stars",
        "Athletics Competition Showcases",
        "Football Team Qualifies",
        "Winter Sports Gain Popularity",
        "Sports Infrastructure Modernizes"
      ],
      technology: [
        "Tech Companies Expand Operations",
        "AI Research Makes Breakthroughs",
        "5G Networks Launch",
        "Cybersecurity Firms Expand",
        "Robotics Industry Advances",
        "Space Industry Receives Support",
        "Cloud Computing Adoption Increases",
        "Biotech Companies Innovate",
        "Quantum Research Advances"
      ],
      health: [
        "Health Ministry Launches Initiative",
        "Medical Research Achieves Results",
        "Mental Health Services Expand",
        "Telemedicine Adoption Grows",
        "Vaccination Programs Succeed",
        "Public Health Campaigns Raise Awareness",
        "Hospital Services Improve",
        "Pharmaceutical Research Develops",
        "Health Technology Enhances Care"
      ],
      science: [
        "Space Agency Mission Succeeds",
        "Climate Research Publishes Findings",
        "Renewable Energy Projects Expand",
        "Marine Research Makes Discoveries",
        "Physics Research Confirms Theories",
        "Archaeological Findings Reveal History",
        "Genetics Research Advances",
        "Astronomy Observatory Discovers",
        "Environmental Programs Succeed"
      ]
    },
    cn: {
      name: "China",
      general: [
        "Government Announces Policy Reforms",
        "National People's Congress Passes Legislation",
        "Supreme Court Issues Ruling",
        "Central Bank Adjusts Policy",
        "Trade Relations Strengthen",
        "Education System Receives Funding",
        "Climate Action Plan Advances",
        "Healthcare System Expands",
        "Infrastructure Projects Transform"
      ],
      business: [
        "Shanghai Stock Exchange Reaches Highs",
        "Tech Sector Attracts Investment",
        "Manufacturing Industry Expands",
        "Renewable Energy Grows",
        "Banking Sector Reports Growth",
        "E-commerce Giants Expand",
        "Real Estate Market Stabilizes",
        "Startup Ecosystem Thrives",
        "Foreign Investment Increases"
      ],
      entertainment: [
        "Chinese Film Industry Celebrates",
        "Music Scene Produces Hits",
        "Streaming Services Launch Content",
        "Television Shows Gain Recognition",
        "Film Festival Showcases Talent",
        "Celebrity Events Draw Attention",
        "Gaming Industry Expands",
        "Podcast Culture Grows",
        "Sports Entertainment Thrives"
      ],
      sports: [
        "Chinese Super League Season Reaches Climax",
        "Olympic Athletes Win Medals",
        "Basketball League Attracts Fans",
        "Table Tennis Championship Draws Viewers",
        "Badminton Tournament Features Stars",
        "Athletics Competition Showcases",
        "Football Team Qualifies",
        "Winter Sports Gain Popularity",
        "Sports Infrastructure Modernizes"
      ],
      technology: [
        "Tech Companies Expand Operations",
        "AI Research Makes Breakthroughs",
        "5G Networks Launch Nationwide",
        "Cybersecurity Firms Expand",
        "E-commerce Technology Advances",
        "Space Industry Receives Support",
        "Cloud Computing Adoption Increases",
        "Biotech Companies Innovate",
        "Quantum Research Advances"
      ],
      health: [
        "Health Ministry Launches Initiative",
        "Medical Research Achieves Results",
        "Traditional Medicine Gains Recognition",
        "Telemedicine Adoption Grows",
        "Vaccination Programs Succeed",
        "Public Health Campaigns Raise Awareness",
        "Hospital Services Improve",
        "Pharmaceutical Research Develops",
        "Health Technology Enhances Care"
      ],
      science: [
        "Space Agency Mission Succeeds",
        "Climate Research Publishes Findings",
        "Renewable Energy Projects Expand",
        "Marine Research Makes Discoveries",
        "Physics Research Confirms Theories",
        "Archaeological Findings Reveal History",
        "Genetics Research Advances",
        "Astronomy Observatory Discovers",
        "Environmental Programs Succeed"
      ]
    },
    br: {
      name: "Brazil",
      general: [
        "President Announces Policy Changes",
        "Congress Passes Key Legislation",
        "Supreme Court Issues Ruling",
        "Central Bank Adjusts Rates",
        "Trade Relations Strengthen",
        "Education System Receives Funding",
        "Climate Action Plan Advances",
        "Healthcare System Expands",
        "Infrastructure Projects Transform"
      ],
      business: [
        "Bovespa Reaches Highs",
        "Tech Sector Attracts Investment",
        "Agriculture Industry Expands",
        "Renewable Energy Grows",
        "Banking Sector Reports Growth",
        "Mining Industry Thrives",
        "Real Estate Market Stabilizes",
        "Startup Ecosystem Expands",
        "Foreign Investment Increases"
      ],
      entertainment: [
        "Brazilian Film Industry Celebrates",
        "Music Scene Produces International Hits",
        "Streaming Services Launch Content",
        "Television Shows Gain Recognition",
        "Film Festival Showcases Talent",
        "Celebrity Events Draw Attention",
        "Gaming Industry Expands",
        "Podcast Culture Grows",
        "Sports Entertainment Thrives"
      ],
      sports: [
        "Brasileirão Season Reaches Climax",
        "Olympic Athletes Win Medals",
        "Football League Attracts Fans",
        "Volleyball Championship Draws Viewers",
        "Formula One Race Features Stars",
        "Athletics Competition Showcases",
        "Football Team Qualifies",
        "Beach Sports Gain Popularity",
        "Sports Infrastructure Modernizes"
      ],
      technology: [
        "Tech Companies Expand Operations",
        "AI Research Makes Progress",
        "5G Networks Launch",
        "Cybersecurity Firms Expand",
        "Fintech Sector Grows",
        "Space Industry Receives Support",
        "Cloud Computing Adoption Increases",
        "Biotech Companies Innovate",
        "Quantum Research Advances"
      ],
      health: [
        "Health Ministry Launches Initiative",
        "Medical Research Achieves Results",
        "Mental Health Services Expand",
        "Telemedicine Adoption Grows",
        "Vaccination Programs Succeed",
        "Public Health Campaigns Raise Awareness",
        "Hospital Services Improve",
        "Pharmaceutical Research Develops",
        "Health Technology Enhances Care"
      ],
      science: [
        "Space Agency Mission Succeeds",
        "Climate Research Publishes Findings",
        "Renewable Energy Projects Expand",
        "Marine Research Makes Discoveries",
        "Physics Research Confirms Theories",
        "Archaeological Findings Reveal History",
        "Genetics Research Advances",
        "Astronomy Observatory Discovers",
        "Environmental Programs Succeed"
      ]
    },
    ru: {
      name: "Russia",
      general: [
        "President Announces Policy Changes",
        "Duma Passes Key Legislation",
        "Supreme Court Issues Ruling",
        "Central Bank Adjusts Rates",
        "Trade Relations Strengthen",
        "Education System Receives Funding",
        "Climate Action Plan Advances",
        "Healthcare System Expands",
        "Infrastructure Projects Transform"
      ],
      business: [
        "Moscow Exchange Reaches Highs",
        "Energy Sector Attracts Investment",
        "Tech Industry Expands",
        "Renewable Energy Grows",
        "Banking Sector Reports Growth",
        "Manufacturing Industry Thrives",
        "Real Estate Market Stabilizes",
        "Startup Ecosystem Expands",
        "Foreign Investment Increases"
      ],
      entertainment: [
        "Russian Film Industry Celebrates",
        "Music Scene Produces Hits",
        "Streaming Services Launch Content",
        "Television Shows Gain Recognition",
        "Film Festival Showcases Talent",
        "Celebrity Events Draw Attention",
        "Gaming Industry Expands",
        "Podcast Culture Grows",
        "Sports Entertainment Thrives"
      ],
      sports: [
        "Premier League Season Reaches Climax",
        "Olympic Athletes Win Medals",
        "Hockey League Attracts Fans",
        "Figure Skating Championship Draws Viewers",
        "Tennis Tournament Features Stars",
        "Athletics Competition Showcases",
        "Football Team Qualifies",
        "Winter Sports Gain Popularity",
        "Sports Infrastructure Modernizes"
      ],
      technology: [
        "Tech Companies Expand Operations",
        "AI Research Makes Progress",
        "5G Networks Launch",
        "Cybersecurity Firms Expand",
        "Fintech Sector Grows",
        "Space Industry Receives Support",
        "Cloud Computing Adoption Increases",
        "Biotech Companies Innovate",
        "Quantum Research Advances"
      ],
      health: [
        "Health Ministry Launches Initiative",
        "Medical Research Achieves Results",
        "Mental Health Services Expand",
        "Telemedicine Adoption Grows",
        "Vaccination Programs Succeed",
        "Public Health Campaigns Raise Awareness",
        "Hospital Services Improve",
        "Pharmaceutical Research Develops",
        "Health Technology Enhances Care"
      ],
      science: [
        "Space Agency Mission Succeeds",
        "Climate Research Publishes Findings",
        "Renewable Energy Projects Expand",
        "Marine Research Makes Discoveries",
        "Physics Research Confirms Theories",
        "Archaeological Findings Reveal History",
        "Genetics Research Advances",
        "Astronomy Observatory Discovers",
        "Environmental Programs Succeed"
      ]
    },
    it: {
      name: "Italy",
      general: [
        "Prime Minister Announces Reforms",
        "Parliament Passes Legislation",
        "Constitutional Court Issues Ruling",
        "ECB Adjusts Policy",
        "EU Relations Strengthen",
        "Education System Receives Funding",
        "Climate Action Plan Advances",
        "Healthcare System Expands",
        "Infrastructure Projects Transform"
      ],
      business: [
        "MIB Reaches Highs",
        "Luxury Industry Expands",
        "Tech Sector Attracts Investment",
        "Renewable Energy Grows",
        "Banking Sector Reports Growth",
        "Tourism Industry Recovers",
        "Real Estate Market Stabilizes",
        "Startup Ecosystem Thrives",
        "Foreign Investment Increases"
      ],
      entertainment: [
        "Italian Film Industry Celebrates",
        "Music Scene Produces Hits",
        "Streaming Services Launch Content",
        "Television Shows Gain Recognition",
        "Film Festival Showcases Talent",
        "Celebrity Events Draw Attention",
        "Gaming Industry Expands",
        "Podcast Culture Grows",
        "Sports Entertainment Thrives"
      ],
      sports: [
        "Serie A Season Reaches Climax",
        "Olympic Athletes Win Medals",
        "Formula One Race Attracts Fans",
        "Tennis Tournament Features Stars",
        "Basketball League Expands",
        "Athletics Competition Showcases",
        "Football Team Qualifies",
        "Winter Sports Gain Popularity",
        "Sports Infrastructure Modernizes"
      ],
      technology: [
        "Tech Companies Expand Operations",
        "AI Research Makes Progress",
        "5G Networks Launch",
        "Cybersecurity Firms Expand",
        "Fintech Sector Grows",
        "Space Industry Receives Support",
        "Cloud Computing Adoption Increases",
        "Biotech Companies Innovate",
        "Quantum Research Advances"
      ],
      health: [
        "Health Ministry Launches Initiative",
        "Medical Research Achieves Results",
        "Mental Health Services Expand",
        "Telemedicine Adoption Grows",
        "Vaccination Programs Succeed",
        "Public Health Campaigns Raise Awareness",
        "Hospital Services Improve",
        "Pharmaceutical Research Develops",
        "Health Technology Enhances Care"
      ],
      science: [
        "Space Agency Mission Succeeds",
        "Climate Research Publishes Findings",
        "Renewable Energy Projects Expand",
        "Marine Research Makes Discoveries",
        "Physics Research Confirms Theories",
        "Archaeological Findings Reveal History",
        "Genetics Research Advances",
        "Astronomy Observatory Discovers",
        "Environmental Programs Succeed"
      ]
    },
    mx: {
      name: "Mexico",
      general: [
        "President Announces Policy Changes",
        "Congress Passes Legislation",
        "Supreme Court Issues Ruling",
        "Central Bank Adjusts Rates",
        "Trade Relations Strengthen",
        "Education System Receives Funding",
        "Climate Action Plan Advances",
        "Healthcare System Expands",
        "Infrastructure Projects Transform"
      ],
      business: [
        "BMV Reaches Highs",
        "Tech Sector Attracts Investment",
        "Manufacturing Industry Expands",
        "Renewable Energy Grows",
        "Banking Sector Reports Growth",
        "Tourism Industry Recovers",
        "Real Estate Market Stabilizes",
        "Startup Ecosystem Expands",
        "Foreign Investment Increases"
      ],
      entertainment: [
        "Mexican Film Industry Celebrates",
        "Music Scene Produces International Hits",
        "Streaming Services Launch Content",
        "Television Shows Gain Recognition",
        "Film Festival Showcases Talent",
        "Celebrity Events Draw Attention",
        "Gaming Industry Expands",
        "Podcast Culture Grows",
        "Sports Entertainment Thrives"
      ],
      sports: [
        "Liga MX Season Reaches Climax",
        "Olympic Athletes Win Medals",
        "Boxing Championship Attracts Fans",
        "Baseball League Draws Viewers",
        "Tennis Tournament Features Stars",
        "Athletics Competition Showcases",
        "Football Team Qualifies",
        "Extreme Sports Gain Popularity",
        "Sports Infrastructure Modernizes"
      ],
      technology: [
        "Tech Companies Expand Operations",
        "AI Research Makes Progress",
        "5G Networks Launch",
        "Cybersecurity Firms Expand",
        "Fintech Sector Grows",
        "Space Industry Receives Support",
        "Cloud Computing Adoption Increases",
        "Biotech Companies Innovate",
        "Quantum Research Advances"
      ],
      health: [
        "Health Ministry Launches Initiative",
        "Medical Research Achieves Results",
        "Mental Health Services Expand",
        "Telemedicine Adoption Grows",
        "Vaccination Programs Succeed",
        "Public Health Campaigns Raise Awareness",
        "Hospital Services Improve",
        "Pharmaceutical Research Develops",
        "Health Technology Enhances Care"
      ],
      science: [
        "Space Agency Mission Succeeds",
        "Climate Research Publishes Findings",
        "Renewable Energy Projects Expand",
        "Marine Research Makes Discoveries",
        "Physics Research Confirms Theories",
        "Archaeological Findings Reveal History",
        "Genetics Research Advances",
        "Astronomy Observatory Discovers",
        "Environmental Programs Succeed"
      ]
    },
    za: {
      name: "South Africa",
      general: [
        "President Announces Policy Changes",
        "Parliament Passes Legislation",
        "Constitutional Court Issues Ruling",
        "Reserve Bank Adjusts Rates",
        "Trade Relations Strengthen",
        "Education System Receives Funding",
        "Climate Action Plan Advances",
        "Healthcare System Expands",
        "Infrastructure Projects Transform"
      ],
      business: [
        "JSE Reaches Highs",
        "Mining Industry Attracts Investment",
        "Tech Sector Expands",
        "Renewable Energy Grows",
        "Banking Sector Reports Growth",
        "Tourism Industry Recovers",
        "Real Estate Market Stabilizes",
        "Startup Ecosystem Expands",
        "Foreign Investment Increases"
      ],
      entertainment: [
        "South African Film Industry Celebrates",
        "Music Scene Produces International Hits",
        "Streaming Services Launch Content",
        "Television Shows Gain Recognition",
        "Film Festival Showcases Talent",
        "Celebrity Events Draw Attention",
        "Gaming Industry Expands",
        "Podcast Culture Grows",
        "Sports Entertainment Thrives"
      ],
      sports: [
        "Premier Soccer League Season Reaches Climax",
        "Olympic Athletes Win Medals",
        "Rugby Championship Attracts Fans",
        "Cricket Series Draws Viewers",
        "Tennis Tournament Features Stars",
        "Athletics Competition Showcases",
        "Football Team Qualifies",
        "Adventure Sports Gain Popularity",
        "Sports Infrastructure Modernizes"
      ],
      technology: [
        "Tech Companies Expand Operations",
        "AI Research Makes Progress",
        "5G Networks Launch",
        "Cybersecurity Firms Expand",
        "Fintech Sector Grows",
        "Space Industry Receives Support",
        "Cloud Computing Adoption Increases",
        "Biotech Companies Innovate",
        "Quantum Research Advances"
      ],
      health: [
        "Health Ministry Launches Initiative",
        "Medical Research Achieves Results",
        "Mental Health Services Expand",
        "Telemedicine Adoption Grows",
        "Vaccination Programs Succeed",
        "Public Health Campaigns Raise Awareness",
        "Hospital Services Improve",
        "Pharmaceutical Research Develops",
        "Health Technology Enhances Care"
      ],
      science: [
        "Space Agency Mission Succeeds",
        "Climate Research Publishes Findings",
        "Renewable Energy Projects Expand",
        "Marine Research Makes Discoveries",
        "Physics Research Confirms Theories",
        "Archaeological Findings Reveal History",
        "Genetics Research Advances",
        "Astronomy Observatory Discovers",
        "Environmental Programs Succeed"
      ]
    }
  };

  // Get country-specific data or default to US
  const countryInfo = countryData[country] || countryData.us;
  const categoryTitles = countryInfo[category] || countryInfo.general;

  const descriptions = [
    "In a significant development that could reshape the industry landscape, experts are analyzing the potential long-term implications.",
    "The announcement comes at a critical time when stakeholders are seeking innovative solutions to pressing challenges.",
    "This breakthrough represents years of collaborative research and development efforts across multiple institutions.",
    "Industry leaders are optimistic about the positive impact this will have on communities and economies worldwide.",
    "The initiative has garnered widespread support from various sectors, highlighting its importance and relevance.",
    "Experts predict this trend will continue to evolve, bringing new opportunities and challenges in the coming months.",
    "The development marks a significant milestone in ongoing efforts to address complex global issues.",
    "Stakeholders are closely monitoring the situation as new information continues to emerge.",
    "This achievement demonstrates the power of innovation and collaboration in solving modern challenges."
  ];

  const sources = ["Reuters", "Associated Press", "BBC News", "CNN", "The Guardian", "Bloomberg", "TechCrunch", "Forbes", "The New York Times"];
  const authors = ["John Smith", "Sarah Johnson", "Michael Chen", "Emily Davis", "David Wilson", "Lisa Anderson", "Robert Brown", "Maria Garcia", "James Taylor"];

  const titles = categoryTitles || countryInfo.general;
  const countryName = countryInfo.name;

  return Array.from({ length: Math.min(count, titles.length) }, (_, i) => ({
    title: titles[i],
    description: descriptions[i],
    url: `https://example.com/news/${country}/${category}/${i + 1}`,
    urlToImage: `https://picsum.photos/800/600?random=${i + Date.now()}`,
    publishedAt: new Date(Date.now() - i * 3600000).toISOString(),
    author: authors[i],
    source: { name: sources[i] },
    content: `${descriptions[i]} This story is from ${countryName} and covers important developments in ${category}.`
  }));
};

export default function News(props) {
  const { pageSize, country, category, apiKey, mode } = props;

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true); // initial full-load state
  const [loadingMore, setLoadingMore] = useState(false); // append state for infinite scroll
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null);
  const [usingMockData, setUsingMockData] = useState(false);

  const isFetchingRef = useRef(false);
  const observerRef = useRef(null);

  const getProvider = (key) => {
    if (!key) return "unknown";
    const lower = key.toLowerCase();
    // simple heuristic: GNews tokens are often shorter or contain '_'
    if (lower.length < 32 || lower.includes("_")) return "gnews";
    return "newsapi";
  };

  const callUrl = async (url) => {
    try {
      const res = await fetch(url);
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error("JSON parse error:", e);
        data = { error: "Invalid JSON response" };
      }
      return { ok: res.ok, status: res.status, data };
    } catch (err) {
      console.error("Fetch error:", err);
      return { ok: false, error: err.message || "Fetch failed" };
    }
  };

  // Stable URL builders wrapped in useCallback to satisfy hook dependencies
  const buildNewsApiUrl = useCallback(
    (key, pageNumber) => {
      const base = "https://newsapi.org/v2/top-headlines";
      const params = [
        `country=${encodeURIComponent(country)}`,
        `category=${encodeURIComponent(category)}`,
        `page=${encodeURIComponent(pageNumber)}`,
        `pageSize=${encodeURIComponent(pageSize)}`,
        `apiKey=${encodeURIComponent(key)}`,
      ].join("&");
      return `${base}?${params}`;
    },
    [country, category, pageSize]
  );

  const buildGNewsUrl = useCallback(
    (key, pageNumber, includeCategory = true) => {
      const base = "https://gnews.io/api/v4/top-headlines";
      const params = [];
      if (includeCategory && category && category !== "general") {
        params.push(`category=${encodeURIComponent(category)}`);
      }
      if (country) {
        params.push(`country=${encodeURIComponent(country)}`);
      }
      params.push(`max=${encodeURIComponent(pageSize)}`);
      params.push(`page=${encodeURIComponent(pageNumber)}`);
      params.push(`apikey=${encodeURIComponent(key)}`);
      return `${base}?${params.join("&")}`;
    },
    [country, category, pageSize]
  );

  /**
   * Stable fetchNews function wrapped with useCallback so we can safely
   * use it in other hooks' dependency arrays (no lint warnings).
   *
   * Dependencies: apiKey, buildNewsApiUrl, buildGNewsUrl
   */
  const fetchNews = useCallback(
    async (pageNumber = 1, { append = false } = {}) => {
      // Prevent duplicate fetches
      if (isFetchingRef.current) return;
      isFetchingRef.current = true;

      // When appending, show loadingMore; otherwise show main loading UI
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
        setError(null);
      }

      const key = apiKey || process.env.REACT_APP_NEWS_API_KEY || "";
      if (!key) {
        // Use mock data when no API key is available
        console.log("No API key provided. Displaying sample news articles.");
        const mockArticles = getMockNews(category, country, pageSize);
        setArticles((prev) => (append ? [...prev, ...mockArticles] : mockArticles));
        setTotalResults(mockArticles.length);
        setPage(pageNumber);
        setLoading(false);
        setLoadingMore(false);
        setUsingMockData(true);
        isFetchingRef.current = false;
        return;
      }
      
      // Reset mock data flag when API key is available
      setUsingMockData(false);

      const provider = getProvider(key);
      let result;

      try {
        if (provider === "gnews") {
          // Try with category first (if applicable)
          let url = buildGNewsUrl(key, pageNumber, true);
          result = await callUrl(url);

          // If failed / no articles, retry without category
          if (!result.ok || !result.data?.articles || result.data.articles.length === 0) {
            url = buildGNewsUrl(key, pageNumber, false);
            result = await callUrl(url);
          }

          if (result.ok && result.data?.articles) {
            const newArticles = result.data.articles;
            setArticles((prev) => (append ? [...prev, ...newArticles] : newArticles));
            setTotalResults(Number(result.data.totalArticles || newArticles.length) || newArticles.length);
            setPage(pageNumber);
            setLoading(false);
            setLoadingMore(false);
            setUsingMockData(false);
            isFetchingRef.current = false;
            return;
          }
        } else {
          // newsapi.org
          const url = buildNewsApiUrl(key, pageNumber);
          result = await callUrl(url);

          if (result.ok && result.data?.articles) {
            const newArticles = result.data.articles;
            setArticles((prev) => (append ? [...prev, ...newArticles] : newArticles));
            setTotalResults(Number(result.data.totalResults || newArticles.length) || newArticles.length);
            setPage(pageNumber);
            setLoading(false);
            setLoadingMore(false);
            setUsingMockData(false);
            isFetchingRef.current = false;
            return;
          }
        }

        // If here, something went wrong or there were no articles - use mock data as fallback
        let errorMessage = "No articles available for this category and country combination.";
        if (result?.data) {
          if (result.data.message) errorMessage = result.data.message;
          else if (result.data.error) errorMessage = typeof result.data.error === "string" ? result.data.error : result.data.error.message || JSON.stringify(result.data.error);
          else if (result.data.errors) errorMessage = JSON.stringify(result.data.errors);
        } else if (result?.error) {
          errorMessage = result.error;
        }

        console.warn("API Error:", errorMessage, "- Using sample news articles as fallback");
        // Use mock data as fallback when API fails
        const mockArticles = getMockNews(category, country, pageSize);
        setArticles((prev) => (append ? [...prev, ...mockArticles] : mockArticles));
        setTotalResults(mockArticles.length);
        setPage(pageNumber);
        setLoading(false);
        setLoadingMore(false);
        setUsingMockData(true);
        isFetchingRef.current = false;
      } catch (e) {
        console.warn("Unexpected fetch error:", e, "- Using sample news articles as fallback");
        // Use mock data as fallback when unexpected error occurs
        const mockArticles = getMockNews(category, country, pageSize);
        setArticles((prev) => (append ? [...prev, ...mockArticles] : mockArticles));
        setTotalResults(mockArticles.length);
        setPage(pageNumber);
        setLoading(false);
        setLoadingMore(false);
        setUsingMockData(true);
        isFetchingRef.current = false;
      }
    },
    [apiKey, buildNewsApiUrl, buildGNewsUrl, category, country, pageSize]
  );

  // Initial load and when fetchNews (stable) changes
  useEffect(() => {
    fetchNews(1, { append: false });
    // cleanup on dependency change: disconnect observer to avoid stale observers
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [fetchNews]);

  // Update document title when category/country/page changes
  useEffect(() => {
    const capCategory = category.charAt(0).toUpperCase() + category.slice(1);
    document.title = `${capCategory} - ${country.toUpperCase()} - NewsWorld`;
  }, [category, country, page]);

  // IntersectionObserver to detect when last article is visible -> load next page
  const lastArticleRef = useCallback(
    (node) => {
      // disconnect previous observer
      if (observerRef.current) observerRef.current.disconnect();

      // if loading or no node, do nothing
      if (loading || loadingMore) return;

      const maxPage = Math.max(1, Math.ceil(totalResults / pageSize) || 1);
      if (page >= maxPage) return; // no more pages

      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isFetchingRef.current) {
              // fetch next page and append
              fetchNews(page + 1, { append: true });
            }
          });
        },
        { root: null, rootMargin: "200px", threshold: 0.1 } // prefetch before fully visible
      );

      if (node) observerRef.current.observe(node);
    },
    [loading, loadingMore, page, totalResults, pageSize, fetchNews]
  );

  const categoryEmojis = {
    general: '📰',
    business: '💼',
    entertainment: '🎬',
    sports: '⚽',
    technology: '💻',
    health: '🏥',
    science: '🔬'
  };

  return (
    <div className="container-fluid px-3 px-md-4 px-lg-5 my-3 my-md-4">
      <div className="hero-section">
        <h1 className="hero-title">
          {categoryEmojis[category] || '📰'} Top {category.charAt(0).toUpperCase() + category.slice(1)} Headlines
        </h1>
        <p className="hero-subtitle">
          Stay updated with the latest news from around the world
        </p>
      </div>

      {usingMockData && !loading && (
        <div className="alert alert-info fade-in responsive-alert mock-data-notice" role="alert">
          <strong className="alert-title">ℹ️ Sample News Articles</strong>
          <span>Displaying sample articles. To view real-time news, please configure your API key in the environment variables.</span>
        </div>
      )}

      {loading && <Spinner />}

      {!loading && articles.length === 0 && (
        <div className="alert alert-info fade-in responsive-alert" role="alert">
          <strong className="alert-title">📭 No articles found</strong>
          <span>No articles found for this category and country combination.</span>
          <small className="alert-meta">
            Try selecting a different country or category.
          </small>
        </div>
      )}

      <div className="row g-3 g-md-4">
        {!error &&
          articles.map((article, index) => {
            const isLast = index === articles.length - 1;
            return (
              <div
                className="col-12 col-sm-6 col-md-6 col-lg-4"
                key={article.url || article.link || index}
                ref={isLast ? lastArticleRef : null}
              >
                <NewsItem
                  title={article.title || article.name || ""}
                  description={article.description || article.content || ""}
                  imageUrl={article.urlToImage || article.image}
                  newsUrl={article.url || article.link}
                  author={article.author}
                  date={article.publishedAt || article.published_at || article.publishedAt}
                  source={article.source && (article.source.name || article.source)}
                  mode={mode}
                />
              </div>
            );
          })}
      </div>

      {/* bottom spinner while loading more items */}
      {loadingMore && (
        <div className="d-flex justify-content-center my-4">
          <Spinner />
        </div>
      )}
    </div>
  );
}

News.defaultProps = {
  country: "us",
  pageSize: 9,
  category: "general",
  apiKey: "",
  mode: "light",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string,
  mode: PropTypes.string,
};
