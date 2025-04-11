'use client'
import React, { useState, useEffect } from 'react';
import styles from '../../styles/RedditResearch.module.css';
import Sidebar from '../components/Sidebar';
import { FaRedditAlien, FaSearch, FaFilter, FaSortAmountDown, FaRegClock, FaFire, FaChartLine, FaTimes, FaBrain } from 'react-icons/fa';
import { IoMdTrendingUp } from 'react-icons/io';
import { BsBookmark, BsCalendar3, BsCardText, BsPlus } from 'react-icons/bs';
import Header from '../components/Header';

const RedditResearch = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [sortMethod, setSortMethod] = useState('relevance');
  const [searchTerm, setSearchTerm] = useState('');
  const [timeRange, setTimeRange] = useState('month');
  const [customTag, setCustomTag] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [summaries, setSummaries] = useState({});
  const [loadingSummaries, setLoadingSummaries] = useState({});
  const [openSummaries, setOpenSummaries] = useState({});
  
  // Predefined tags
  const predefinedTags = [
    'I Wish...', 'devs', 'Glitch', 'Money', 'Mod', 'Hack', 
    'Performance', 'UI/UX', 'Content', 'Balance', 'Bug', 'Feature'
  ];
  
  // Dummy data for Reddit posts with tags
  const posts = [
    {
      id: 1,
      title: 'Anyone played the new update? What are your thoughts?',
      author: 'GameEnthusiast42',
      subreddit: 'r/gaming',
      upvotes: 2467,
      comments: 532,
      timePosted: '2 days ago',
      snippet: 'The new update has some interesting features but Im having issues with the new combat system. Anyone else experiencing this?',
      sentiment: 'mixed',
      tags: ['Content', 'Bug', 'Performance']
    },
    {
      id: 2,
      title: 'The progression system is broken and heres why',
      author: 'BalanceWizard',
      subreddit: 'r/gamedesign',
      upvotes: 5283,
      comments: 842,
      timePosted: '1 week ago',
      snippet: 'After dozens of hours of gameplay, its clear that the progression curve is fundamentally broken. The early game is too slow and the mid-game...',
      sentiment: 'negative',
      tags: ['Balance', 'devs', 'Feature']
    },
    {
      id: 3,
      title: 'This game has the best character customization Ive seen',
      author: 'RPGLover2023',
      subreddit: 'r/games',
      upvotes: 3891,
      comments: 624,
      timePosted: '3 days ago',
      snippet: 'Ive spent more time in the character creator than the actual game. The level of detail is amazing and puts other RPGs to shame...',
      sentiment: 'positive',
      tags: ['UI/UX', 'Content', 'Feature']
    },
    {
      id: 4,
      title: 'Tips for new players - everything I wish I knew',
      author: 'HelpfulGamer',
      subreddit: 'r/GamingTips',
      upvotes: 1937,
      comments: 312,
      timePosted: '5 days ago',
      snippet: 'After 100+ hours, here are some essential tips to help new players get started. First, focus on resource management before...',
      sentiment: 'positive',
      tags: ['I Wish...', 'Content']
    },
    {
      id: 5,
      title: 'Found a way to duplicate items - devs please fix this',
      author: 'ExploitHunter',
      subreddit: 'r/gaming',
      upvotes: 1243,
      comments: 287,
      timePosted: '1 day ago',
      snippet: 'I discovered a glitch that allows players to duplicate rare items. This is game-breaking and needs to be fixed immediately...',
      sentiment: 'negative',
      tags: ['Glitch', 'Hack', 'devs', 'Bug']
    },
    {
      id: 6,
      title: 'The new battle pass is too expensive',
      author: 'FrugalGamer',
      subreddit: 'r/gaming',
      upvotes: 3421,
      comments: 876,
      timePosted: '3 days ago',
      snippet: 'I love this game but the new battle pass costs $15 and only gives mediocre rewards. This is getting ridiculous...',
      sentiment: 'negative',
      tags: ['Money', 'Content']
    },
    {
      id: 7,
      title: 'I wish there was a way to customize the HUD',
      author: 'UIEnthusiast',
      subreddit: 'r/games',
      upvotes: 1876,
      comments: 432,
      timePosted: '4 days ago',
      snippet: 'The current HUD is too cluttered. It would be great if we could customize which elements to show or hide...',
      sentiment: 'mixed',
      tags: ['I Wish...', 'UI/UX']
    },
    {
      id: 8,
      title: 'This mod makes the game look incredible',
      author: 'ModLover',
      subreddit: 'r/gaming',
      upvotes: 2934,
      comments: 543,
      timePosted: '2 days ago',
      snippet: 'I installed the Enhanced Graphics mod and the game looks like a completely different experience. The lighting effects are amazing...',
      sentiment: 'positive',
      tags: ['Mod', 'UI/UX']
    }
  ];
  
  // Dummy data for trending topics
  const trendingTopics = [
    { id: 1, topic: 'Combat System', mentions: 1283, sentiment: 'negative', change: '+32%' },
    { id: 2, topic: 'Character Creation', mentions: 876, sentiment: 'positive', change: '+15%' },
    { id: 3, topic: 'Server Stability', mentions: 764, sentiment: 'negative', change: '+128%' },
    { id: 4, topic: 'New Content Update', mentions: 643, sentiment: 'mixed', change: 'New' },
    { id: 5, topic: 'Monetization', mentions: 532, sentiment: 'negative', change: '+22%' }
  ];
  
  // Dummy data for subreddits
  const subreddits = [
    { id: 1, name: 'r/gaming', members: '34.2M', relevantPosts: 287, sentiment: 'mixed' },
    { id: 2, name: 'r/gamedesign', members: '612K', relevantPosts: 154, sentiment: 'negative' },
    { id: 3, name: 'r/games', members: '3.7M', relevantPosts: 93, sentiment: 'positive' },
    { id: 4, name: 'r/truegaming', members: '1.9M', relevantPosts: 76, sentiment: 'mixed' },
    { id: 5, name: 'r/GameDevelopment', members: '428K', relevantPosts: 42, sentiment: 'positive' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Search logic would go here
    console.log('Searching for:', searchTerm);
  };

  // Handle tag selection
  const handleTagSelect = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Handle tag removal
  const handleTagRemove = (tagToRemove) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  // Handle custom tag addition
  const handleCustomTagAdd = (e) => {
    e.preventDefault();
    if (customTag.trim() && !selectedTags.includes(customTag.trim())) {
      setSelectedTags([...selectedTags, customTag.trim()]);
      setCustomTag('');
    }
  };

  // Filter posts based on selected tags
  const filteredPosts = selectedTags.length > 0
    ? posts.filter(post => selectedTags.some(tag => post.tags.includes(tag)))
    : posts;

  // Sort posts based on sort method
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortMethod) {
      case 'latest':
        return new Date(b.timePosted) - new Date(a.timePosted);
      case 'upvotes':
        return b.upvotes - a.upvotes;
      case 'comments':
        return b.comments - a.comments;
      default: // relevance
        return 0;
    }
  });

  // Mock AI summarization function (replace with actual AI integration later)
  const generateSummary = async (postId, content) => {
    setLoadingSummaries(prev => ({ ...prev, [postId]: true }));
    
    try {
      // Simulate API call - replace with actual AI call later
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock summary - replace with actual AI response
      const summary = {
        keyPoints: [
          {
            point: "Combat system issues affecting gameplay experience",
            sentiment: "negative",
            confidence: 0.85
          },
          {
            point: "New features receiving mixed feedback",
            sentiment: "mixed",
            confidence: 0.75
          },
          {
            point: "Performance concerns in specific scenarios",
            sentiment: "negative",
            confidence: 0.90
          }
        ],
        overallSentiment: "mixed",
        relevanceScore: 0.88
      };
      
      setSummaries(prev => ({
        ...prev,
        [postId]: summary
      }));
      // Automatically open the summary when it's generated
      setOpenSummaries(prev => ({
        ...prev,
        [postId]: true
      }));
    } catch (error) {
      console.error('Error generating summary:', error);
    } finally {
      setLoadingSummaries(prev => ({ ...prev, [postId]: false }));
    }
  };

  const handleSummarize = (postId, content) => {
    if (!summaries[postId]) {
      generateSummary(postId, content);
    } else {
      // Toggle the summary open/closed state
      setOpenSummaries(prev => ({
        ...prev,
        [postId]: !prev[postId]
      }));
    }
  };

  return (
    <div className={styles.pageContainer}>
      
      <Header />
      <Sidebar />
      <main className={styles.mainContent}>
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>
              <FaRedditAlien className={styles.redditIcon} /> Reddit Research
            </h1>
            <p className={styles.subtitle}>Analyze community feedback and sentiment from Reddit</p>
          </div>
          
          <form className={styles.searchForm} onSubmit={handleSearch}>
            <div className={styles.searchInputWrapper}>
              <FaSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search posts, topics, or subreddits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            <button type="submit" className={styles.searchButton}>Search</button>
          </form>
        </div>
        
        <div className={styles.controlsBar}>
          <div className={styles.leftControls}>
            <div className={styles.tabs}>
              <button 
                className={`${styles.tabButton} ${activeTab === 'posts' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('posts')}
              >
                <BsCardText />
                <span>Posts</span>
              </button>
              <button 
                className={`${styles.tabButton} ${activeTab === 'topics' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('topics')}
              >
                <IoMdTrendingUp />
                <span>Trending Topics</span>
              </button>
              <button 
                className={`${styles.tabButton} ${activeTab === 'subreddits' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('subreddits')}
              >
                <FaRedditAlien />
                <span>Subreddits</span>
              </button>
              <button 
                className={`${styles.tabButton} ${activeTab === 'analytics' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('analytics')}
              >
                <FaChartLine />
                <span>Analytics</span>
              </button>
            </div>
          </div>

          {activeTab === 'posts' && (
            <div className={styles.filterWrapper}>
              <div className={styles.filterControls}>
                <div className={styles.filterDropdown}>
                  <button 
                    className={styles.filterButton}
                    onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                  >
                    <FaFilter />
                    <span>Filter</span>
                    <FaSortAmountDown />
                  </button>
                  
                  {isFilterMenuOpen && (
                    <div className={styles.filterMenu}>
                      <div className={styles.filterSection}>
                        <h4>Sort by</h4>
                        <div className={styles.sortOptions}>
                          <button
                            className={`${styles.sortOption} ${sortMethod === 'latest' ? styles.active : ''}`}
                            onClick={() => setSortMethod('latest')}
                          >
                            <FaRegClock />
                            <span>Latest</span>
                          </button>
                          <button
                            className={`${styles.sortOption} ${sortMethod === 'relevance' ? styles.active : ''}`}
                            onClick={() => setSortMethod('relevance')}
                          >
                            <FaSearch />
                            <span>Most Relevant</span>
                          </button>
                          <button
                            className={`${styles.sortOption} ${sortMethod === 'upvotes' ? styles.active : ''}`}
                            onClick={() => setSortMethod('upvotes')}
                          >
                            <FaFire />
                            <span>Most Upvoted</span>
                          </button>
                          <button
                            className={`${styles.sortOption} ${sortMethod === 'comments' ? styles.active : ''}`}
                            onClick={() => setSortMethod('comments')}
                          >
                            <BsCardText />
                            <span>Most Comments</span>
                          </button>
                        </div>
                      </div>
                      
                      <div className={styles.filterSection}>
                        <h4>Filter by Tags</h4>
                        <div className={styles.tagInputContainer}>
                          <form onSubmit={handleCustomTagAdd}>
                            <input
                              type="text"
                              placeholder="Add custom tag..."
                              value={customTag}
                              onChange={(e) => setCustomTag(e.target.value)}
                              className={styles.tagInput}
                            />
                            <button type="submit" className={styles.addTagButton}>
                              <BsPlus />
                            </button>
                          </form>
                        </div>
                        
                        <div className={styles.predefinedTags}>
                          {predefinedTags.map(tag => (
                            <button
                              key={tag}
                              className={`${styles.tagButton} ${selectedTags.includes(tag) ? styles.tagSelected : ''}`}
                              onClick={() => handleTagSelect(tag)}
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {selectedTags.length > 0 && (
                  <div className={styles.activeFilters}>
                    <span className={styles.filterLabel}>Active Filters:</span>
                    <div className={styles.filterTags}>
                      {selectedTags.map(tag => (
                        <div key={tag} className={styles.filterTag}>
                          <span>{tag}</span>
                          <button onClick={() => handleTagRemove(tag)}>
                            <FaTimes />
                          </button>
                        </div>
                      ))}
                      <div className={styles.filterTag}>
                        <span>{sortMethod === 'latest' ? 'Latest' : 
                               sortMethod === 'relevance' ? 'Most Relevant' :
                               sortMethod === 'upvotes' ? 'Most Upvoted' : 'Most Comments'}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        {activeTab === 'posts' && (
          <div className={styles.postsContainer}>
            {sortedPosts.map(post => (
              <div key={post.id} className={styles.postCard}>
                <div className={styles.postHeader}>
                  <div className={styles.postSubreddit}>{post.subreddit}</div>
                  <div className={styles.postTime}>
                    <FaRegClock />
                    <span>{post.timePosted}</span>
                  </div>
                </div>
                
                <h3 className={styles.postTitle}>{post.title}</h3>
                <p className={styles.postSnippet}>{post.snippet}</p>
                
                <div className={styles.postTags}>
                  {post.tags.map(tag => (
                    <span 
                      key={tag} 
                      className={`${styles.postTag} ${selectedTags.includes(tag) ? styles.postTagHighlighted : ''}`}
                      onClick={() => handleTagSelect(tag)}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className={styles.postFooter}>
                  <div className={styles.postStats}>
                    <div className={styles.postStat}>
                      <FaFire />
                      <span>{post.upvotes} upvotes</span>
                    </div>
                    <div className={styles.postStat}>
                      <BsCardText />
                      <span>{post.comments} comments</span>
                    </div>
                    <div className={`${styles.postSentiment} ${styles[post.sentiment]}`}>
                      {post.sentiment}
                    </div>
                  </div>
                  
                  <div className={styles.postActions}>
                    <button 
                      className={`${styles.postAction} ${styles.summarizeButton} ${summaries[post.id] && openSummaries[post.id] ? styles.active : ''}`}
                      onClick={() => handleSummarize(post.id, post.snippet)}
                      disabled={loadingSummaries[post.id]}
                    >
                      <FaBrain />
                      <span>
                        {loadingSummaries[post.id] ? 'Analyzing...' : 
                         summaries[post.id] ? (openSummaries[post.id] ? 'Hide Summary' : 'Show Summary') : 
                         'Summarize'}
                      </span>
                    </button>
                    <button className={styles.postAction}>
                      <BsBookmark />
                      <span>Save</span>
                    </button>
                  </div>
                </div>

                {summaries[post.id] && openSummaries[post.id] && (
                  <div className={`${styles.summaryContainer} ${styles.summarySlide}`}>
                    <div className={styles.summaryHeader}>
                      <FaBrain className={styles.summaryIcon} />
                      <h4>AI Summary</h4>
                      <div className={styles.summaryMeta}>
                        <span className={styles.relevanceScore}>
                          Relevance: {Math.round(summaries[post.id].relevanceScore * 100)}%
                        </span>
                        <div className={`${styles.summaryOverallSentiment} ${styles[summaries[post.id].overallSentiment]}`}>
                          {summaries[post.id].overallSentiment}
                        </div>
                      </div>
                    </div>
                    
                    <div className={styles.summaryPoints}>
                      {summaries[post.id].keyPoints.map((point, index) => (
                        <div key={index} className={styles.summaryPoint}>
                          <div className={styles.pointContent}>
                            <span className={styles.pointBullet}>•</span>
                            <p>{point.point}</p>
                          </div>
                          <div className={styles.pointMeta}>
                            <div className={`${styles.pointSentiment} ${styles[point.sentiment]}`}>
                              {point.sentiment}
                            </div>
                            <span className={styles.confidenceScore}>
                              {Math.round(point.confidence * 100)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            <div className={styles.loadMore}>
              <button className={styles.loadMoreButton}>Load more posts</button>
            </div>
          </div>
        )}
        
        {activeTab === 'topics' && (
          <div className={styles.topicsContainer}>
            <div className={styles.topicsHeader}>
              <h2>Trending Topics</h2>
              <div className={styles.topicsTimeSelector}>
                <BsCalendar3 />
                <select className={styles.filterSelect}>
                  <option value="day">Today</option>
                  <option value="week">This week</option>
                  <option value="month" selected>This month</option>
                </select>
              </div>
            </div>
            
            <div className={styles.topicsTable}>
              <div className={styles.topicsTableHeader}>
                <div className={styles.topicColumn}>Topic</div>
                <div className={styles.mentionsColumn}>Mentions</div>
                <div className={styles.sentimentColumn}>Sentiment</div>
                <div className={styles.changeColumn}>Change</div>
                <div className={styles.actionsColumn}>Actions</div>
              </div>
              
              {trendingTopics.map(topic => (
                <div key={topic.id} className={styles.topicRow}>
                  <div className={styles.topicColumn}>{topic.topic}</div>
                  <div className={styles.mentionsColumn}>{topic.mentions}</div>
                  <div className={styles.sentimentColumn}>
                    <span className={`${styles.sentimentBadge} ${styles[topic.sentiment]}`}>
                      {topic.sentiment}
                    </span>
                  </div>
                  <div className={styles.changeColumn}>{topic.change}</div>
                  <div className={styles.actionsColumn}>
                    <button className={styles.topicViewButton}>View Posts</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'subreddits' && (
          <div className={styles.subredditsContainer}>
            <div className={styles.subredditsGrid}>
              {subreddits.map(subreddit => (
                <div key={subreddit.id} className={styles.subredditCard}>
                  <div className={styles.subredditIcon}>
                    <FaRedditAlien />
                  </div>
                  <div className={styles.subredditInfo}>
                    <h3 className={styles.subredditName}>{subreddit.name}</h3>
                    <div className={styles.subredditStats}>
                      <div className={styles.subredditStat}>
                        <span className={styles.statLabel}>Members:</span>
                        <span className={styles.statValue}>{subreddit.members}</span>
                      </div>
                      <div className={styles.subredditStat}>
                        <span className={styles.statLabel}>Posts:</span>
                        <span className={styles.statValue}>{subreddit.relevantPosts}</span>
                      </div>
                      <div className={styles.subredditStat}>
                        <span className={styles.statLabel}>Sentiment:</span>
                        <span className={`${styles.sentimentBadge} ${styles[subreddit.sentiment]}`}>
                          {subreddit.sentiment}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.subredditActions}>
                    <button className={styles.subredditButton}>View Posts</button>
                    <button className={styles.subredditButton}>Track</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'analytics' && (
          <div className={styles.analyticsPlaceholder}>
            <div className={styles.placeholderIcon}>
              <FaChartLine size={48} />
            </div>
            <h2>Reddit Analytics</h2>
            <p>This section will display advanced sentiment analysis, trend visualization, and engagement metrics.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default RedditResearch;