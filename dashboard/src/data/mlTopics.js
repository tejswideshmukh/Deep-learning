// AI/ML/DL Learning Pipeline
// Each topic has 4 mastery levels: Concept, Implement, Apply, Explain

export const ML_MASTERY_LEVELS = ['Concept', 'Implement', 'Apply', 'Explain'];

export const INITIAL_ML_TOPICS = [
  // ===== MATH FOUNDATIONS =====
  {
    id: 'math',
    name: 'Math Foundations',
    color: '#6366f1',
    sections: [
      {
        id: 'linalg',
        name: 'Linear Algebra',
        topics: [
          { id: 'la-1', name: 'Vectors, Dot Product, Cross Product', mastery: 0, completed: false },
          { id: 'la-2', name: 'Matrix Operations (implement multiply)', mastery: 0, completed: false },
          { id: 'la-3', name: 'Eigenvalues & Eigenvectors', mastery: 0, completed: false },
          { id: 'la-4', name: 'SVD — Singular Value Decomposition', mastery: 0, completed: false },
          { id: 'la-5', name: 'Matrix Rank, Inverse, Determinant', mastery: 0, completed: false },
          { id: 'la-6', name: 'PCA derivation using linear algebra', mastery: 0, completed: false },
        ],
      },
      {
        id: 'prob',
        name: 'Probability & Statistics',
        topics: [
          { id: 'pr-1', name: 'Bayes Theorem (deep intuition)', mastery: 0, completed: false },
          { id: 'pr-2', name: 'Distributions: Gaussian, Bernoulli, Poisson', mastery: 0, completed: false },
          { id: 'pr-3', name: 'Expectation, Variance, Covariance', mastery: 0, completed: false },
          { id: 'pr-4', name: 'MLE vs MAP estimation', mastery: 0, completed: false },
          { id: 'pr-5', name: 'Hypothesis Testing, p-values', mastery: 0, completed: false },
          { id: 'pr-6', name: 'Central Limit Theorem', mastery: 0, completed: false },
        ],
      },
      {
        id: 'calc',
        name: 'Calculus for ML',
        topics: [
          { id: 'ca-1', name: 'Partial Derivatives, Gradients', mastery: 0, completed: false },
          { id: 'ca-2', name: 'Chain Rule (backbone of backprop)', mastery: 0, completed: false },
          { id: 'ca-3', name: 'Gradient Descent derivation', mastery: 0, completed: false },
          { id: 'ca-4', name: 'Convex vs Non-convex optimization', mastery: 0, completed: false },
          { id: 'ca-5', name: 'Lagrange Multipliers (for SVM)', mastery: 0, completed: false },
        ],
      },
      {
        id: 'info',
        name: 'Information Theory',
        topics: [
          { id: 'it-1', name: 'Entropy, Cross-Entropy', mastery: 0, completed: false },
          { id: 'it-2', name: 'KL Divergence', mastery: 0, completed: false },
          { id: 'it-3', name: 'Mutual Information', mastery: 0, completed: false },
          { id: 'it-4', name: 'Why cross-entropy loss works', mastery: 0, completed: false },
        ],
      },
    ],
  },

  // ===== CLASSICAL ML =====
  {
    id: 'classical-ml',
    name: 'Classical ML',
    color: '#22c55e',
    sections: [
      {
        id: 'regression',
        name: 'Regression',
        topics: [
          { id: 'reg-1', name: 'Linear Regression from scratch', mastery: 0, completed: false },
          { id: 'reg-2', name: 'Normal equation derivation', mastery: 0, completed: false },
          { id: 'reg-3', name: 'Gradient descent implementation', mastery: 0, completed: false },
          { id: 'reg-4', name: 'Ridge (L2) & Lasso (L1) Regularization', mastery: 0, completed: false },
          { id: 'reg-5', name: 'Polynomial Regression', mastery: 0, completed: false },
          { id: 'reg-6', name: 'Bias-Variance Tradeoff (learning curves)', mastery: 0, completed: false },
        ],
      },
      {
        id: 'classification',
        name: 'Classification',
        topics: [
          { id: 'cls-1', name: 'Logistic Regression from scratch', mastery: 0, completed: false },
          { id: 'cls-2', name: 'Sigmoid, Log-loss derivation', mastery: 0, completed: false },
          { id: 'cls-3', name: 'Softmax / Multi-class', mastery: 0, completed: false },
          { id: 'cls-4', name: 'Decision Trees (CART from scratch)', mastery: 0, completed: false },
          { id: 'cls-5', name: 'Gini Impurity vs Entropy', mastery: 0, completed: false },
          { id: 'cls-6', name: 'Random Forest (bagging logic)', mastery: 0, completed: false },
          { id: 'cls-7', name: 'SVM (hard/soft margin, kernels)', mastery: 0, completed: false },
          { id: 'cls-8', name: 'KNN from scratch', mastery: 0, completed: false },
          { id: 'cls-9', name: 'Naive Bayes from scratch', mastery: 0, completed: false },
        ],
      },
      {
        id: 'ensemble',
        name: 'Ensemble Methods',
        topics: [
          { id: 'ens-1', name: 'Bagging vs Boosting intuition', mastery: 0, completed: false },
          { id: 'ens-2', name: 'AdaBoost from scratch', mastery: 0, completed: false },
          { id: 'ens-3', name: 'Gradient Boosting from scratch', mastery: 0, completed: false },
          { id: 'ens-4', name: 'XGBoost (understand + use)', mastery: 0, completed: false },
        ],
      },
      {
        id: 'unsupervised',
        name: 'Unsupervised Learning',
        topics: [
          { id: 'uns-1', name: 'K-Means from scratch', mastery: 0, completed: false },
          { id: 'uns-2', name: 'K-Means++ & Elbow method', mastery: 0, completed: false },
          { id: 'uns-3', name: 'DBSCAN from scratch', mastery: 0, completed: false },
          { id: 'uns-4', name: 'Hierarchical Clustering', mastery: 0, completed: false },
          { id: 'uns-5', name: 'PCA from scratch (eigen decomposition)', mastery: 0, completed: false },
          { id: 'uns-6', name: 't-SNE (intuition + library)', mastery: 0, completed: false },
          { id: 'uns-7', name: 'GMM + EM Algorithm', mastery: 0, completed: false },
        ],
      },
      {
        id: 'ml-fundamentals',
        name: 'ML Fundamentals',
        topics: [
          { id: 'mlf-1', name: 'Cross-Validation (K-Fold, Stratified)', mastery: 0, completed: false },
          { id: 'mlf-2', name: 'Metrics: Precision, Recall, F1, ROC-AUC', mastery: 0, completed: false },
          { id: 'mlf-3', name: 'Confusion Matrix deep dive', mastery: 0, completed: false },
          { id: 'mlf-4', name: 'Overfitting vs Underfitting', mastery: 0, completed: false },
          { id: 'mlf-5', name: 'Feature Engineering & Selection', mastery: 0, completed: false },
          { id: 'mlf-6', name: 'Handling Imbalanced Data (SMOTE)', mastery: 0, completed: false },
          { id: 'mlf-7', name: 'Feature Scaling: Standard, MinMax', mastery: 0, completed: false },
        ],
      },
    ],
  },

  // ===== DEEP LEARNING =====
  {
    id: 'deep-learning',
    name: 'Deep Learning',
    color: '#a855f7',
    sections: [
      {
        id: 'nn-foundations',
        name: 'Neural Network Foundations',
        topics: [
          { id: 'nn-1', name: 'Perceptron from scratch', mastery: 0, completed: false },
          { id: 'nn-2', name: 'MLP forward pass from scratch', mastery: 0, completed: false },
          { id: 'nn-3', name: 'Backpropagation from scratch', mastery: 0, completed: false },
          { id: 'nn-4', name: 'Train on MNIST (numpy only)', mastery: 0, completed: false },
          { id: 'nn-5', name: 'Activation Functions (ReLU, Sigmoid, GELU)', mastery: 0, completed: false },
          { id: 'nn-6', name: 'Loss Functions (MSE, Cross-Entropy)', mastery: 0, completed: false },
          { id: 'nn-7', name: 'SGD from scratch', mastery: 0, completed: false },
          { id: 'nn-8', name: 'Adam optimizer from scratch', mastery: 0, completed: false },
          { id: 'nn-9', name: 'Weight Init (Xavier, He)', mastery: 0, completed: false },
          { id: 'nn-10', name: 'Batch Normalization from scratch', mastery: 0, completed: false },
          { id: 'nn-11', name: 'Dropout from scratch', mastery: 0, completed: false },
        ],
      },
      {
        id: 'cnn',
        name: 'CNNs',
        topics: [
          { id: 'cnn-1', name: 'Convolution operation from scratch', mastery: 0, completed: false },
          { id: 'cnn-2', name: 'Pooling, Stride, Padding', mastery: 0, completed: false },
          { id: 'cnn-3', name: 'Architectures: LeNet to ResNet', mastery: 0, completed: false },
          { id: 'cnn-4', name: 'Basic CNN from scratch (numpy)', mastery: 0, completed: false },
          { id: 'cnn-5', name: 'Transfer Learning with PyTorch', mastery: 0, completed: false },
          { id: 'cnn-6', name: 'Data Augmentation', mastery: 0, completed: false },
        ],
      },
      {
        id: 'rnn',
        name: 'RNNs & Sequence Models',
        topics: [
          { id: 'rnn-1', name: 'Vanilla RNN from scratch', mastery: 0, completed: false },
          { id: 'rnn-2', name: 'Vanishing gradient in RNNs', mastery: 0, completed: false },
          { id: 'rnn-3', name: 'LSTM from scratch', mastery: 0, completed: false },
          { id: 'rnn-4', name: 'GRU from scratch', mastery: 0, completed: false },
          { id: 'rnn-5', name: 'Bidirectional RNNs', mastery: 0, completed: false },
          { id: 'rnn-6', name: 'Seq2Seq models', mastery: 0, completed: false },
          { id: 'rnn-7', name: 'Attention Mechanism', mastery: 0, completed: false },
        ],
      },
      {
        id: 'transformer',
        name: 'Transformers & Modern DL',
        topics: [
          { id: 'tf-1', name: 'Self-Attention from scratch', mastery: 0, completed: false },
          { id: 'tf-2', name: 'Multi-Head Attention from scratch', mastery: 0, completed: false },
          { id: 'tf-3', name: 'Positional Encoding', mastery: 0, completed: false },
          { id: 'tf-4', name: 'Full Transformer from scratch', mastery: 0, completed: false },
          { id: 'tf-5', name: 'BERT architecture & pre-training', mastery: 0, completed: false },
          { id: 'tf-6', name: 'GPT architecture & autoregressive', mastery: 0, completed: false },
          { id: 'tf-7', name: 'Vision Transformers (ViT)', mastery: 0, completed: false },
          { id: 'tf-8', name: 'Fine-tuning pre-trained models', mastery: 0, completed: false },
        ],
      },
      {
        id: 'advanced-dl',
        name: 'Advanced DL',
        topics: [
          { id: 'adl-1', name: 'GANs (implement basic GAN)', mastery: 0, completed: false },
          { id: 'adl-2', name: 'Autoencoders (Vanilla, VAE)', mastery: 0, completed: false },
          { id: 'adl-3', name: 'Diffusion Models (high-level)', mastery: 0, completed: false },
          { id: 'adl-4', name: 'Contrastive Learning (SimCLR)', mastery: 0, completed: false },
          { id: 'adl-5', name: 'Knowledge Distillation', mastery: 0, completed: false },
        ],
      },
    ],
  },

  // ===== ML SYSTEM DESIGN =====
  {
    id: 'ml-system-design',
    name: 'ML System Design',
    color: '#f97316',
    sections: [
      {
        id: 'sys-design',
        name: 'System Design for ML',
        topics: [
          { id: 'sd-1', name: 'Design a Recommendation System', mastery: 0, completed: false },
          { id: 'sd-2', name: 'Design a Spam Classifier', mastery: 0, completed: false },
          { id: 'sd-3', name: 'Design a Search Ranking System', mastery: 0, completed: false },
          { id: 'sd-4', name: 'Design Ad Click Prediction', mastery: 0, completed: false },
          { id: 'sd-5', name: 'Design Fraud Detection', mastery: 0, completed: false },
          { id: 'sd-6', name: 'ML Pipeline: Data to Deploy', mastery: 0, completed: false },
        ],
      },
    ],
  },
];
