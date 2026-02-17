---
# Metadata
title: MCTS Connect 4 Solver
tags:
    - Python
    - Bit manipulation
    - MCTS
---

The goal of this project was to build a high performing AI that solves Connect 4---balancing speed and performance.

## Approach

This project combines two ideas:

### 1. Bitboard Representation


### 2. Monte Carlo Tree Search (MCTS)

To decide moves, the bot uses <a href="https://en.wikipedia.org/wiki/Monte_Carlo_tree_search" target="_blank">`Monte Carlo Tree Search`</a>, an algorithm that balances:

- **Exploration** – trying new or uncertain moves
- **Exploitation** – favoring moves that have performed well in simulations
