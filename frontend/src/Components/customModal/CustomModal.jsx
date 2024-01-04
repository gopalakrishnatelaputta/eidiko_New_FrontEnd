import { Modal } from '@mui/material'
import React from 'react'

export default function CustomModal({modalopen,modalclose,children}) {



                return (
                       <Modal
                        sx={{overflow:"scroll",display:"flex",justifyContent:"center",alignContent:"center",alignItems:"center"}}
                        open={modalopen}
                        onClose={modalclose}
                        aria-labelledby="parent-modal-title"
                        aria-describedby="parent-modal-description">
                          
                      {children}
                      
                    </Modal>
   
                  )
}
