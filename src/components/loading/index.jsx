import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './styles.module.scss';

const Loading = ({ isShown }) => {
  return (
    <>
      <AnimatePresence>
        {isShown && (
          <motion.div
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              ease: 'easeOut',
            }}
            className={styles.loading}
          >
            <span>L</span>
            <span>O</span>
            <span>A</span>
            <span>D</span>
            <span>I</span>
            <span>N</span>
            <span>G</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Loading;
