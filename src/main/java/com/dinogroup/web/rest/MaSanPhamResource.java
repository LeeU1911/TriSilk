package com.dinogroup.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dinogroup.domain.MaSanPham;

import com.dinogroup.repository.MaSanPhamRepository;
import com.dinogroup.web.rest.errors.BadRequestAlertException;
import com.dinogroup.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing MaSanPham.
 */
@RestController
@RequestMapping("/api")
public class MaSanPhamResource {

    private final Logger log = LoggerFactory.getLogger(MaSanPhamResource.class);

    private static final String ENTITY_NAME = "maSanPham";

    private final MaSanPhamRepository maSanPhamRepository;

    public MaSanPhamResource(MaSanPhamRepository maSanPhamRepository) {
        this.maSanPhamRepository = maSanPhamRepository;
    }

    /**
     * POST  /ma-san-phams : Create a new maSanPham.
     *
     * @param maSanPham the maSanPham to create
     * @return the ResponseEntity with status 201 (Created) and with body the new maSanPham, or with status 400 (Bad Request) if the maSanPham has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ma-san-phams")
    @Timed
    public ResponseEntity<MaSanPham> createMaSanPham(@RequestBody MaSanPham maSanPham) throws URISyntaxException {
        log.debug("REST request to save MaSanPham : {}", maSanPham);
        if (maSanPham.getId() != null) {
            throw new BadRequestAlertException("A new maSanPham cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MaSanPham result = maSanPhamRepository.save(maSanPham);
        return ResponseEntity.created(new URI("/api/ma-san-phams/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ma-san-phams : Updates an existing maSanPham.
     *
     * @param maSanPham the maSanPham to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated maSanPham,
     * or with status 400 (Bad Request) if the maSanPham is not valid,
     * or with status 500 (Internal Server Error) if the maSanPham couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ma-san-phams")
    @Timed
    public ResponseEntity<MaSanPham> updateMaSanPham(@RequestBody MaSanPham maSanPham) throws URISyntaxException {
        log.debug("REST request to update MaSanPham : {}", maSanPham);
        if (maSanPham.getId() == null) {
            return createMaSanPham(maSanPham);
        }
        MaSanPham result = maSanPhamRepository.save(maSanPham);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, maSanPham.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ma-san-phams : get all the maSanPhams.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of maSanPhams in body
     */
    @GetMapping("/ma-san-phams")
    @Timed
    public List<MaSanPham> getAllMaSanPhams() {
        log.debug("REST request to get all MaSanPhams");
        return maSanPhamRepository.findAll();
        }

    /**
     * GET  /ma-san-phams/:id : get the "id" maSanPham.
     *
     * @param id the id of the maSanPham to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the maSanPham, or with status 404 (Not Found)
     */
    @GetMapping("/ma-san-phams/{id}")
    @Timed
    public ResponseEntity<MaSanPham> getMaSanPham(@PathVariable Long id) {
        log.debug("REST request to get MaSanPham : {}", id);
        MaSanPham maSanPham = maSanPhamRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(maSanPham));
    }

    /**
     * DELETE  /ma-san-phams/:id : delete the "id" maSanPham.
     *
     * @param id the id of the maSanPham to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ma-san-phams/{id}")
    @Timed
    public ResponseEntity<Void> deleteMaSanPham(@PathVariable Long id) {
        log.debug("REST request to delete MaSanPham : {}", id);
        maSanPhamRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
