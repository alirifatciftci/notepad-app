import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useState } from 'react';

type TabType = 'defterlerim' | 'notlarim' | 'sayfalar';
type PageColor = 'white' | 'cream' | 'blue' | 'pink' | 'green' | 'yellow' | 'purple' | 'orange' | 'red' | 'gray' | 'brown' | 'teal';
type PagePattern = 'plain' | 'lined' | 'grid' | 'dotted' | 'ruled' | 'squared';

type PatternColor = 'gray' | 'blue' | 'green' | 'red' | 'purple' | 'orange' | 'brown' | 'black';

interface Page {
  id: string;
  color: PageColor;
  pattern: PagePattern;
  patternColor: PatternColor;
  title: string;
}

const PATTERN_COLORS: Record<PatternColor, string> = {
  gray: '#808080',
  blue: '#2196F3',
  green: '#4CAF50',
  red: '#F44336',
  purple: '#9C27B0',
  orange: '#FF9800',
  brown: '#795548',
  black: '#212121',
};

const PAGE_COLORS: Record<PageColor, string> = {
  white: '#FFFFFF',
  cream: '#FFF8DC',
  blue: '#B3E5FC',
  pink: '#F8BBD0',
  green: '#C8E6C9',
  yellow: '#FFF59D',
  purple: '#E1BEE7',
  orange: '#FFCC80',
  red: '#FFAB91',
  gray: '#E0E0E0',
  brown: '#D7CCC8',
  teal: '#80DEEA',
};

const screenWidth = Dimensions.get('window').width;

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('defterlerim');
  const [pages, setPages] = useState<Page[]>([
    { id: '1', color: 'white', pattern: 'plain', patternColor: 'gray', title: 'Sayfa 1' },
    { id: '2', color: 'cream', pattern: 'lined', patternColor: 'gray', title: 'Sayfa 2' },
    { id: '3', color: 'blue', pattern: 'grid', patternColor: 'gray', title: 'Sayfa 3' },
  ]);

  const renderContent = () => {
    switch (activeTab) {
      case 'defterlerim':
        return (
          <View style={styles.content}>
            <Text style={styles.contentTitle}>Defterlerim</Text>
            <Text style={styles.contentText}>Defterleriniz burada görünecek</Text>
          </View>
        );
      case 'notlarim':
        return (
          <View style={styles.content}>
            <Text style={styles.contentTitle}>Notlarım</Text>
            <Text style={styles.contentText}>Notlarınız burada görünecek</Text>
          </View>
        );
      case 'sayfalar':
        return (
          <View style={styles.pagesContainer}>
            <View style={styles.pagesHeader}>
              <Text style={styles.pagesTitle}>Sayfalarım</Text>
            </View>
            <ScrollView 
              horizontal
              style={styles.pagesScrollView}
              contentContainerStyle={styles.pagesScrollContent}
              showsHorizontalScrollIndicator={false}
              pagingEnabled={false}
              snapToInterval={screenWidth * 0.75 + 16}
              decelerationRate="fast"
            >
              {pages.map((page) => (
                <View key={page.id} style={styles.pageCard}>
                  <View style={styles.pagePreview}>
                    <View style={[
                      styles.pagePreviewContent,
                      { backgroundColor: PAGE_COLORS[page.color] }
                    ]}>
                      {page.pattern === 'lined' && (
                        <View style={styles.linedPattern}>
                          {[...Array(8)].map((_, i) => (
                            <View key={i} style={[styles.line, { backgroundColor: PATTERN_COLORS[page.patternColor] }]} />
                          ))}
                        </View>
                      )}
                      {page.pattern === 'grid' && (
                        <View style={styles.gridPattern}>
                          {[...Array(6)].map((_, i) => (
                            <View key={i} style={styles.gridRow}>
                              {[...Array(4)].map((_, j) => (
                                <View key={j} style={[styles.gridCell, { borderColor: PATTERN_COLORS[page.patternColor] }]} />
                              ))}
                            </View>
                          ))}
                        </View>
                      )}
                      {page.pattern === 'plain' && (
                        <View style={styles.plainPattern} />
                      )}
                      {page.pattern === 'dotted' && (
                        <View style={styles.dottedPattern}>
                          {[...Array(12)].map((_, i) => (
                            <View key={i} style={styles.dottedRow}>
                              {[...Array(8)].map((_, j) => (
                                <View key={j} style={[styles.dot, { backgroundColor: PATTERN_COLORS[page.patternColor] }]} />
                              ))}
                            </View>
                          ))}
                        </View>
                      )}
                      {page.pattern === 'ruled' && (
                        <View style={styles.ruledPattern}>
                          {[...Array(10)].map((_, i) => (
                            <View 
                              key={i} 
                              style={[
                                styles.rule, 
                                { backgroundColor: PATTERN_COLORS[page.patternColor] },
                                i === 0 && { borderTopWidth: 2, borderTopColor: PATTERN_COLORS[page.patternColor] }
                              ]} 
                            />
                          ))}
                        </View>
                      )}
                      {page.pattern === 'squared' && (
                        <View style={styles.squaredPattern}>
                          {[...Array(8)].map((_, i) => (
                            <View key={i} style={styles.squaredRow}>
                              {[...Array(6)].map((_, j) => (
                                <View key={j} style={[styles.square, { borderColor: PATTERN_COLORS[page.patternColor] }]} />
                              ))}
                            </View>
                          ))}
                        </View>
                      )}
                    </View>
                    <Text style={styles.pageTitle}>{page.title}</Text>
                  </View>

                  <ScrollView 
                    style={styles.pageOptionsScroll}
                    contentContainerStyle={styles.pageOptionsContent}
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={true}
                  >
                    <View style={styles.pageOptions}>
                        <View style={styles.optionSection}>
                          <Text style={styles.optionLabel}>Renk</Text>
                          <View style={styles.colorGrid}>
                            {(Object.keys(PAGE_COLORS) as PageColor[]).map((color) => (
                              <TouchableOpacity
                                key={color}
                                style={[
                                  styles.colorOption,
                                  { backgroundColor: PAGE_COLORS[color] },
                                  page.color === color && styles.selectedColorOption
                                ]}
                                onPress={() => {
                                  setPages(pages.map(p => 
                                    p.id === page.id ? { ...p, color } : p
                                  ));
                                }}
                                activeOpacity={0.7}
                              >
                                {page.color === color && (
                                  <View style={styles.colorCheckmarkContainer}>
                                    <Text style={styles.colorCheckmarkIcon}>✓</Text>
                                  </View>
                                )}
                              </TouchableOpacity>
                            ))}
                          </View>
                        </View>

                        <View style={styles.optionSection}>
                          <Text style={styles.optionLabel}>Desen</Text>
                          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.patternOptionsScroll}>
                            <View style={styles.patternOptions}>
                              {(['plain', 'lined', 'grid', 'dotted', 'ruled', 'squared'] as PagePattern[]).map((pattern) => (
                            <TouchableOpacity
                              key={pattern}
                              style={[
                                styles.patternOption,
                                page.pattern === pattern && styles.selectedPatternOption
                              ]}
                              onPress={() => {
                                setPages(pages.map(p => 
                                  p.id === page.id ? { ...p, pattern } : p
                                ));
                              }}
                            >
                              <View style={[
                                styles.patternPreview,
                                { backgroundColor: PAGE_COLORS[page.color] }
                              ]}>
                                {pattern === 'lined' && (
                                  <View style={styles.patternLined}>
                                    {[...Array(3)].map((_, i) => (
                                      <View key={i} style={[styles.patternLine, { backgroundColor: PATTERN_COLORS[page.patternColor] }]} />
                                    ))}
                                  </View>
                                )}
                                {pattern === 'grid' && (
                                  <View style={styles.patternGrid}>
                                    {[...Array(2)].map((_, i) => (
                                      <View key={i} style={styles.patternGridRow}>
                                        {[...Array(2)].map((_, j) => (
                                          <View key={j} style={[styles.patternGridCell, { borderColor: PATTERN_COLORS[page.patternColor] }]} />
                                        ))}
                                      </View>
                                    ))}
                                  </View>
                                )}
                                {pattern === 'dotted' && (
                                  <View style={styles.patternDotted}>
                                    {[...Array(3)].map((_, i) => (
                                      <View key={i} style={styles.patternDottedRow}>
                                        {[...Array(4)].map((_, j) => (
                                          <View key={j} style={[styles.patternDot, { backgroundColor: PATTERN_COLORS[page.patternColor] }]} />
                                        ))}
                                      </View>
                                    ))}
                                  </View>
                                )}
                                {pattern === 'ruled' && (
                                  <View style={styles.patternRuled}>
                                    {[...Array(4)].map((_, i) => (
                                      <View key={i} style={[styles.patternRule, { backgroundColor: PATTERN_COLORS[page.patternColor] }]} />
                                    ))}
                                  </View>
                                )}
                                {pattern === 'squared' && (
                                  <View style={styles.patternSquared}>
                                    {[...Array(3)].map((_, i) => (
                                      <View key={i} style={styles.patternSquaredRow}>
                                        {[...Array(3)].map((_, j) => (
                                          <View key={j} style={[styles.patternSquare, { borderColor: PATTERN_COLORS[page.patternColor] }]} />
                                        ))}
                                      </View>
                                    ))}
                                  </View>
                                )}
                              </View>
                              <Text style={[
                                styles.patternLabel,
                                page.pattern === pattern && styles.selectedPatternLabel
                              ]}>
                                {pattern === 'plain' ? 'Düz' : 
                                 pattern === 'lined' ? 'Çizgili' : 
                                 pattern === 'grid' ? 'Kareli' :
                                 pattern === 'dotted' ? 'Noktalı' :
                                 pattern === 'ruled' ? 'Satırlı' : 'Kareli'}
                              </Text>
                            </TouchableOpacity>
                            ))}
                            </View>
                          </ScrollView>
                        </View>

                        {page.pattern !== 'plain' && (
                          <View style={styles.optionSection}>
                            <Text style={styles.optionLabel}>Desen Rengi</Text>
                            <View style={styles.colorGrid}>
                              {(Object.keys(PATTERN_COLORS) as PatternColor[]).map((patternColor) => (
                                <TouchableOpacity
                                  key={patternColor}
                                  style={[
                                    styles.colorOption,
                                    { backgroundColor: PATTERN_COLORS[patternColor] },
                                    page.patternColor === patternColor && styles.selectedColorOption
                                  ]}
                                  onPress={() => {
                                    setPages(pages.map(p => 
                                      p.id === page.id ? { ...p, patternColor } : p
                                    ));
                                  }}
                                  activeOpacity={0.7}
                                >
                                  {page.patternColor === patternColor && (
                                    <View style={styles.colorCheckmarkContainer}>
                                      <Text style={styles.colorCheckmarkIcon}>✓</Text>
                                    </View>
                                  )}
                                </TouchableOpacity>
                              ))}
                            </View>
                          </View>
                        )}
                      </View>
                    </ScrollView>
                </View>
              ))}
              <TouchableOpacity
                style={styles.addPageCard}
                onPress={() => {
                  const newPage: Page = {
                    id: Date.now().toString(),
                    color: 'white',
                    pattern: 'plain',
                    patternColor: 'gray',
                    title: `Sayfa ${pages.length + 1}`,
                  };
                  setPages([...pages, newPage]);
                }}
                activeOpacity={0.7}
              >
                <View style={styles.addPageContent}>
                  <Text style={styles.addPageIcon}>+</Text>
                  <Text style={styles.addPageText}>Yeni Sayfa</Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {renderContent()}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[
            styles.button, 
            styles.firstButton,
            activeTab === 'defterlerim' && styles.activeButton
          ]} 
          activeOpacity={0.7}
          onPress={() => setActiveTab('defterlerim')}
        >
          <Text style={[
            styles.buttonText,
            activeTab === 'defterlerim' && styles.activeButtonText
          ]}>Defterlerim</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.button,
            activeTab === 'notlarim' && styles.activeButton
          ]} 
          activeOpacity={0.7}
          onPress={() => setActiveTab('notlarim')}
        >
          <Text style={[
            styles.buttonText,
            activeTab === 'notlarim' && styles.activeButtonText
          ]}>Notlarım</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.button, 
            styles.lastButton,
            activeTab === 'sayfalar' && styles.activeButton
          ]} 
          activeOpacity={0.7}
          onPress={() => setActiveTab('sayfalar')}
        >
          <Text style={[
            styles.buttonText,
            activeTab === 'sayfalar' && styles.activeButtonText
          ]}>Sayfalar</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
  },
  contentTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  contentText: {
    fontSize: 16,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  button: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 24,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
  },
  activeButton: {
    backgroundColor: '#f8f8f8',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  firstButton: {
    borderLeftWidth: 0,
  },
  lastButton: {
    borderRightWidth: 0,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  activeButtonText: {
    color: '#007AFF',
    fontWeight: '700',
  },
  // Sayfalar stilleri
  pagesContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  pagesHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  pagesTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  pagesScrollView: {
    flex: 1,
  },
  pagesScrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 16,
  },
  pageCard: {
    width: screenWidth * 0.75,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pagePreview: {
    marginBottom: 12,
  },
  pagePreviewContent: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
    marginBottom: 8,
  },
  pageTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  // Desen stilleri
  plainPattern: {
    flex: 1,
  },
  linedPattern: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  line: {
    height: 1,
    backgroundColor: '#d0d0d0',
    width: '100%',
  },
  gridPattern: {
    flex: 1,
    padding: 8,
    gap: 8,
  },
  gridRow: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
  },
  gridCell: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d0d0d0',
    borderRadius: 2,
  },
  // Seçenekler stilleri
  pageOptionsScroll: {
    maxHeight: 400,
  },
  pageOptionsContent: {
    paddingBottom: 8,
  },
  pageOptions: {
    marginTop: 16,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
    backgroundColor: '#fafafa',
    marginHorizontal: -16,
    paddingHorizontal: 16,
    paddingBottom: 8,
    borderRadius: 12,
  },
  optionSection: {
    marginBottom: 24,
  },
  optionLabel: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: 4,
  },
  colorOption: {
    width: (screenWidth * 0.75 - 64) / 4,
    height: (screenWidth * 0.75 - 64) / 4,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  selectedColorOption: {
    borderColor: '#007AFF',
    borderWidth: 3,
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
    transform: [{ scale: 1.05 }],
  },
  colorCheckmarkContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  colorCheckmarkIcon: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  patternOptionsScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  patternOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  patternOption: {
    minWidth: 90,
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    backgroundColor: '#fafafa',
  },
  selectedPatternOption: {
    borderColor: '#007AFF',
    backgroundColor: '#E3F2FD',
  },
  patternPreview: {
    width: 60,
    height: 60,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#d0d0d0',
    marginBottom: 8,
    overflow: 'hidden',
  },
  patternLined: {
    flex: 1,
    padding: 6,
    justifyContent: 'space-between',
  },
  patternLine: {
    height: 1,
    backgroundColor: '#b0b0b0',
    width: '100%',
  },
  patternGrid: {
    flex: 1,
    padding: 4,
    gap: 4,
  },
  patternGridRow: {
    flex: 1,
    flexDirection: 'row',
    gap: 4,
  },
  patternGridCell: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#b0b0b0',
    borderRadius: 1,
  },
  patternLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
  selectedPatternLabel: {
    color: '#007AFF',
    fontWeight: '600',
  },
  // Yeni desen stilleri
  dottedPattern: {
    flex: 1,
    padding: 8,
    gap: 8,
  },
  dottedRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  dot: {
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: '#b0b0b0',
  },
  ruledPattern: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  rule: {
    height: 1,
    backgroundColor: '#d0d0d0',
    width: '100%',
  },
  marginLine: {
    borderTopWidth: 2,
    borderTopColor: '#a0a0a0',
  },
  squaredPattern: {
    flex: 1,
    padding: 6,
    gap: 6,
  },
  squaredRow: {
    flex: 1,
    flexDirection: 'row',
    gap: 6,
  },
  square: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d0d0d0',
    borderRadius: 1,
  },
  // Desen önizleme stilleri
  patternDotted: {
    flex: 1,
    padding: 4,
    gap: 4,
  },
  patternDottedRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  patternDot: {
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: '#999',
  },
  patternRuled: {
    flex: 1,
    padding: 6,
    justifyContent: 'space-between',
  },
  patternRule: {
    height: 1,
    backgroundColor: '#999',
    width: '100%',
  },
  patternSquared: {
    flex: 1,
    padding: 3,
    gap: 3,
  },
  patternSquaredRow: {
    flex: 1,
    flexDirection: 'row',
    gap: 3,
  },
  patternSquare: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 1,
  },
  // Yeni sayfa kartı
  addPageCard: {
    width: screenWidth * 0.75,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  addPageContent: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  addPageIcon: {
    fontSize: 48,
    fontWeight: '300',
    color: '#999',
    marginBottom: 8,
  },
  addPageText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
});

